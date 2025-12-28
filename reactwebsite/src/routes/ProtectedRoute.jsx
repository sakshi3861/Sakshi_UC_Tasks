import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(UserContext);

  if (loading) return <p className="text-center mt-8">Checking authentication...</p>;

  return user ? children : <Navigate to="/login" />;
}
