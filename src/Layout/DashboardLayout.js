import useAdmin from "../Hooks/useAdmin";
import useBuyer from "../Hooks/useBuyer";
import useSeller from "../Hooks/useSeller";
import DashboardNav from "../Pages/Shared/DashboardNav";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function DashboardLayout() {
  const { currentuser } = useAuth();
  const email = currentuser?.email;

  const [isBuyer] = useBuyer(email);
  const [isSeller] = useSeller(email);
  const [isAdmin] = useAdmin(email);

  const buyerNavItems = [
    {
      path: "/dashboard/myOrders",
      text: "My Orders",
    },
    {
      path: "/dashboard/myWishlist",
      text: "My Wishlist",
    },
  ];

  const sellerNavItems = [
    {
      path: "/dashboard/addAproduct",
      text: "Add A Product",
    },
    {
      path: "/dashboard/myProducts",
      text: "My Products",
    },
  ];

  const adminNavItems = [
    {
      path: "/dashboard/allSellers",
      text: "All Sellers",
    },
    {
      path: "/dashboard/allBuyers",
      text: "All Buyers",
    },
  ];

  const createNav = function (menuForUser) {
    return menuForUser.map((item, i) => (
      <NavLink
        key={i}
        className={({ isActive }) =>
          isActive
            ? "text-white bg-green-400 px-3 py-2 transition duration-300 rounded font-semibold shadow-md shadow-green-300"
            : "text-black px-3 py-2 transition duration-300 rounded font-semibold"
        }
        to={item.path}
      >
        {item.text}
      </NavLink>
    ));
  };

  return (
    <div className="max-w-[1440px] mx-auto">
      <DashboardNav />
      <div className="drawer drawer-mobile">
        <input id="estore-drawer" type="checkbox" className="drawer-toggle" />
        <div className="flex drawer-content mt-5 ">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="estore-drawer" className="drawer-overlay"></label>
          <ul className="py-4 space-y-3 mx-3 menu w-80 bg-base-100 text-base-content">
            {isBuyer && createNav(buyerNavItems)}
            {isSeller && createNav(sellerNavItems)}
            {isAdmin && createNav(adminNavItems)}
          </ul>
        </div>
      </div>
    </div>
  );
}
