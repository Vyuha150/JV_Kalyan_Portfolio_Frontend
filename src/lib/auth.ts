// Auth helpers for admin sign-in that integrate with backend.
const API_BASE =
  (import.meta.env.VITE_API_BASE_URL as string) || "http://localhost:5000";

export type SignInResult = { ok: true } | { ok: false; message: string };

export const signIn = async (
  usernameOrEmail: string,
  password: string
): Promise<SignInResult> => {
  try {
    console.log("🔐 Attempting sign in with:", {
      API_BASE,
      url: `${API_BASE}/auth/signin`,
      email: usernameOrEmail,
    });

    const res = await fetch(`${API_BASE}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: usernameOrEmail, password }),
    });

    console.log("📡 Response status:", res.status);
    console.log("📡 Response headers:", Object.fromEntries(res.headers));

    const data = await res.json();
    console.log("📦 Response data:", data);

    if (!res.ok) {
      console.error("❌ Sign in failed:", data);
      return { ok: false, message: data?.message || "Signin failed" };
    }

    console.log("✅ Sign in successful");
    return { ok: true };
  } catch (err) {
    console.error("🚨 Network error:", err);
    return { ok: false, message: (err as Error).message || "Network error" };
  }
};

export const signOut = async (): Promise<void> => {
  await fetch(`${API_BASE}/auth/signout`, {
    method: "POST",
    credentials: "include",
  });
};

export const checkAuth = async (): Promise<boolean> => {
  try {
    console.log("🔍 Checking auth with:", `${API_BASE}/auth/me`);
    const res = await fetch(`${API_BASE}/auth/me`, {
      credentials: "include",
    });
    console.log("🔍 Auth check response:", res.status, res.ok);
    if (!res.ok) {
      const data = await res.json();
      console.log("🔍 Auth check failed data:", data);
    }
    return res.ok;
  } catch (err) {
    console.error("🚨 Auth check error:", err);
    return false;
  }
};

export default { signIn, signOut, checkAuth };
