import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface Props {
  children: React.ReactElement;
}

const GuestRoute = ({ children }: Props) => {
  const { isLoading, isAuthed } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Checking session...</p>
      </div>
    );
  }

  if (isAuthed) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default GuestRoute;
