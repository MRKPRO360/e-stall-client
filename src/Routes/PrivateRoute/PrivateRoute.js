import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Spinners from "../../Pages/Shared/Spinners";

export default function PrivateRoute({ children }) {
  const location = useLocation();
  const { currentuser, loading } = useAuth();

  if (loading) return <Spinners />;

  return currentuser?.uid ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
