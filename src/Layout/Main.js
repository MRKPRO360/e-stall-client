import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer";
import Nav from "../Pages/Shared/Nav";

export default function Main() {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}
