import useAdmin from "../Hooks/useAdmin";
import useBuyer from "../Hooks/useBuyer";
import useSeller from "../Hooks/useSeller";
import DashboardNav from "../Pages/Shared/DashboardNav";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function DashboardLayout() {
  const { currentuser } = useAuth();
  const email = currentuser?.email;

  const [isBuyer] = useBuyer(email);
  const [isSeller] = useSeller(email);
  const [isAdmin] = useAdmin(email);

  console.log(isBuyer, isSeller, isAdmin);

  const buyerNavItems = [
    {
      path: "/myOrders",
      text: "My Orders",
    },
    {
      path: "/myWishlist",
      text: "My Wishlist",
    },
  ];

  const sellerNavItems = [
    {
      path: "/addAproduct",
      text: "Add A Product",
    },
    {
      path: "/myProducts",
      text: "My Products",
    },
  ];

  const adminNavItems = [
    {
      path: "/allSellers",
      text: "All Sellers",
    },
    {
      path: "/allBuyers",
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
        <div className="flex flex-col items-center justify-center drawer-content">
          {/* Page content here  */}
        </div>
        <div className="drawer-side">
          <label htmlFor="estore-drawer" className="drawer-overlay"></label>
          <ul className="p-4 menu w-80 bg-base-100 text-base-content">
            {isBuyer && createNav(buyerNavItems)}
            {isSeller && createNav(sellerNavItems)}
            {isAdmin && createNav(adminNavItems)}
          </ul>
        </div>
      </div>
    </div>
  );
}
