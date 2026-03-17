// Auth helpers for admin sign-in that integrate with backend.
import { API_BASE_URL } from "@/lib/apiConfig";

export type SignInResult = { ok: true } | { ok: false; message: string };

export const signIn = async (
  usernameOrEmail: string,
  password: string
): Promise<SignInResult> => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: usernameOrEmail, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { ok: false, message: data?.message || "Signin failed" };
    }

    return { ok: true };
  } catch (err) {
    return { ok: false, message: (err as Error).message || "Network error" };
  }
};

export const signOut = async (): Promise<void> => {
  await fetch(`${API_BASE_URL}/auth/signout`, {
    method: "POST",
    credentials: "include",
  });
};

export const checkAuth = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
};

export default { signIn, signOut, checkAuth };
