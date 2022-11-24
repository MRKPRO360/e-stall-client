import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export default function Nav() {
  const { currentuser } = useAuth();

  const navItems = [
    {
      path: "/category/hp",
      text: "Hp",
    },
    {
      path: "/category/dell",
      text: "Dell",
    },
    {
      path: "/category/lenovo",
      text: "Lenovo",
    },
  ];

  const defaultNav = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-white bg-green-400 px-3 py-2 transition duration-300 rounded font-semibold shadow-md shadow-green-300"
            : "text-black px-3 py-2 transition duration-300 rounded font-semibold"
        }
        to="/"
      >
        Home
      </NavLink>
      <li className="px-3 py-2 bg-white font-semibold">
        Category
        <ul className=" bg-gray-200 relative z-50">
          {navItems.map((el, i) => (
            <NavLink
              className="px-4 py-2 hover:bg-gray-300 rounded "
              key={i}
              to={el.path}
            >
              {el.text}
            </NavLink>
          ))}
        </ul>
      </li>
      {!currentuser?.uid && (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-white bg-green-400 px-3 py-2 transition duration-300 rounded font-semibold shadow-md shadow-green-300"
              : "text-black px-3 py-2 transition duration-300 rounded font-semibold"
          }
          to="/login"
        >
          Login
        </NavLink>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 justify-between">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 gap-4"
          >
            {defaultNav}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case">
          <span className="text-xl">E-Stall</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-2 gap-6">{defaultNav}</ul>
      </div>
    </div>
  );
}
