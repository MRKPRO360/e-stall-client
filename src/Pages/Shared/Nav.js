import { NavLink } from "react-router-dom";

export default function Nav() {
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
      path: "/category/asus",
      text: "Asus",
    },
  ];

  const defaultNav = (
    <>
      <NavLink to="/">Home</NavLink>
      <li>
        Category
        <ul className="p-2 bg-base-100 ">
          {navItems.map((el, i) => (
            <NavLink className="p-2" key={i} to={el.path}>
              {el.text}
            </NavLink>
          ))}
        </ul>
      </li>
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
        <a className="btn btn-ghost normal-case text-xl">E-Stall</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-2 gap-6">{defaultNav}</ul>
      </div>
    </div>
  );
}
