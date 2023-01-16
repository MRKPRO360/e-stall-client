import DashboardNav from "../Pages/Shared/DashboardNav";
import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const buyerNavItems = [
    {
      path: "/dashboard",
      text: "My Orders",
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
          <ul className="py-4 space-y-3 menu w-80 bg-base-100 text-base-content">
            {createNav(buyerNavItems)}
          </ul>
        </div>
      </div>
    </div>
  );
}
