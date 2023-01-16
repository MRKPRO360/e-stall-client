import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import useAdmin from "../../Hooks/useAdmin";
import useBuyer from "../../Hooks/useBuyer";
import useSeller from "../../Hooks/useSeller";

export default function Nav() {
  const { currentuser, logout } = useAuth();
  const email = currentuser?.email;
  const [isBuyer] = useBuyer(email);
  const [isSeller] = useSeller(email);
  const [isAdmin] = useAdmin(email);

  const handleLogout = async function () {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

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
      <li className="px-3 py-2 font-semibold bg-white">
        Category
        <ul className="relative z-50 bg-gray-200 ">
          {navItems.map((el, i) => (
            <NavLink
              className="px-4 py-2 rounded hover:bg-gray-300 "
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
      {currentuser?.uid && (
        <>
          {isBuyer && (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-green-400 px-3 py-2 transition duration-300 rounded font-semibold shadow-md shadow-green-300"
                  : "text-black px-3 py-2 transition duration-300 rounded font-semibold"
              }
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          )}
          {isSeller && (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-green-400 px-3 py-2 transition duration-300 rounded font-semibold shadow-md shadow-green-300"
                  : "text-black px-3 py-2 transition duration-300 rounded font-semibold"
              }
              to="/sellerDashboard/"
            >
              Dashboard
            </NavLink>
          )}

          {isAdmin && (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-green-400 px-3 py-2 transition duration-300 rounded font-semibold shadow-md shadow-green-300"
                  : "text-black px-3 py-2 transition duration-300 rounded font-semibold"
              }
              to="/adminDashboard/"
            >
              Dashboard
            </NavLink>
          )}

          <Link
            onClick={handleLogout}
            className="px-3 py-2 font-semibold text-black transition duration-300 rounded"
            to="/login"
          >
            Logout
          </Link>
        </>
      )}
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "text-white bg-green-400 px-3 py-2 transition duration-300 rounded font-semibold shadow-md shadow-green-300"
            : "text-black px-3 py-2 transition duration-300 rounded font-semibold"
        }
        to="/blog"
      >
        Blog
      </NavLink>
    </>
  );
  return (
    <div className="justify-between navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
          <ul
            tabIndex={0}
            className="gap-4 p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            {defaultNav}
          </ul>
        </div>
        <Link to="/" className="normal-case btn btn-ghost">
          <span className="text-xl">E-Stall</span>
        </Link>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="gap-6 p-2 menu menu-horizontal">{defaultNav}</ul>
      </div>
    </div>
  );
}
