import { NavLink, Link } from "react-router-dom";

import useBuyer from "../../Hooks/useBuyer";
import useSeller from "../../Hooks/useSeller";
import useAdmin from "../../Hooks/useAdmin";
export default function DashboardNav() {
  const [isBuyer] = useBuyer();
  const [isSeller] = useSeller();
  const [isAdmin] = useAdmin();

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

  const buyerNav = buyerNavItems.map((item, i) => (
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

  return (
    <div className="flex items-center justify-between px-3 bg-gray-100 2xl:px-0 lg:justify-start">
      <div className="w-80">
        <Link to="/" className="normal-case btn btn-ghost">
          <span className="text-xl">E-Stall</span>
        </Link>
      </div>

      <label
        tabIndex={0}
        htmlFor="estore-drawer"
        className="btn btn-ghost lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
    </div>
  );
}
