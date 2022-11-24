import DashboardNav from "../Pages/Shared/DashboardNav";

export default function DashboardLayout() {
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
            {/* sidebar link */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
