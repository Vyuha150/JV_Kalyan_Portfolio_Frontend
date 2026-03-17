import React from "react";
import { checkAuth, signIn, signOut, type SignInResult } from "@/lib/auth";
import { setUnauthorizedHandler } from "@/services/api";

type AuthContextValue = {
  isAuthed: boolean;
  isLoading: boolean;
  refreshAuth: () => Promise<boolean>;
  login: (email: string, password: string) => Promise<SignInResult>;
  logout: () => Promise<void>;
  setAuthed: (value: boolean) => void;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthed, setIsAuthed] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const refreshAuth = React.useCallback(async () => {
    const ok = await checkAuth();
    setIsAuthed(ok);
    return ok;
  }, []);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const ok = await checkAuth();
        if (!mounted) return;
        setIsAuthed(ok);
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  React.useEffect(() => {
    setUnauthorizedHandler(() => {
      setIsAuthed(false);
      if (window.location.pathname.startsWith("/admin")) {
        window.location.replace("/admin/login?reason=session-expired");
      }
    });

    return () => {
      setUnauthorizedHandler(null);
    };
  }, []);

  const login = React.useCallback(async (email: string, password: string) => {
    const result = await signIn(email, password);
    if (result.ok) {
      setIsAuthed(true);
    }
    return result;
  }, []);

  const logout = React.useCallback(async () => {
    try {
      await signOut();
    } finally {
      setIsAuthed(false);
    }
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      isAuthed,
      isLoading,
      refreshAuth,
      login,
      logout,
      setAuthed: setIsAuthed,
    }),
    [isAuthed, isLoading, refreshAuth, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
