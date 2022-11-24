import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import useSeller from "../../Hooks/useSeller";
import Spinners from "../../Pages/Shared/Spinners";

export default function SellerRoute({ children }) {
  const location = useLocation();

  const { currentuser, loading } = useAuth();
  const email = currentuser?.email;

  const [isSeller, isSellerLoading] = useSeller(email);

  if (loading || isSellerLoading) return <Spinners />;

  return currentuser?.uid && isSeller ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
