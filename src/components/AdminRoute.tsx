import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAuth } from "@/lib/auth";

interface Props {
  children: React.ReactElement;
}

const AdminRoute = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const ok = await checkAuth();
      if (mounted) {
        setAuthed(ok);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return null; // or a spinner
  if (!authed) return <Navigate to="/admin/login" replace />;
  return children;
};

export default AdminRoute;
