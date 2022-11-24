import { Link } from "react-router-dom";

export default function DashboardNav() {
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
