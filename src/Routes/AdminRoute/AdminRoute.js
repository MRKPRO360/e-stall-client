import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import useAdmin from "../../Hooks/useAdmin";
import Spinners from "../../Pages/Shared/Spinners";

export default function AdminRoute({ children }) {
  const location = useLocation();

  const { currentuser, loading } = useAuth();
  const email = currentuser?.email;

  const [isAdmin, isAdminLoading] = useAdmin(email);

  if (loading || isAdminLoading) return <Spinners />;

  return currentuser?.uid && isAdmin ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
