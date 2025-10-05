import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "@/lib/auth";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log("🔐 SignIn attempt:", {
      username: username.trim(),
      API_BASE: import.meta.env.VITE_API_BASE_URL,
    });

    const result = await signIn(username.trim(), password);
    setLoading(false);

    if (result.ok) {
      console.log("✅ SignIn successful, navigating to admin");
      navigate("/admin");
    } else {
      // result is { ok: false; message }
      const errorMessage =
        (result as { ok: false; message: string }).message || "Signin failed";
      console.error("❌ SignIn failed:", errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 bg-card/80 backdrop-blur rounded-2xl border border-border/50 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Admin Sign In</h2>
        <p className="text-sm text-muted-foreground mb-2">
          Enter your admin credentials to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email or Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-border/40 bg-transparent"
              placeholder="admin@jvkalyan.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full px-3 py-2 rounded-md border border-border/40 bg-transparent"
              placeholder="password"
            />
          </div>

          {error && <div className="text-sm text-destructive">{error}</div>}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
