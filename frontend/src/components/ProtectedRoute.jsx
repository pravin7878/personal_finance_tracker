import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  // If either user or token missing → redirect
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
