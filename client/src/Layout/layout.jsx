
import { Outlet, useLocation } from "react-router";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout() {
  const { pathname } = useLocation();

  const authPages = [
    "/login",
    "/register",
  ];

  const dashboardPages =
    pathname.startsWith("/reports") ||
    pathname.startsWith("/create-report") ||
    pathname.startsWith("/interview");

  const hideNavbar =
    authPages.includes(pathname);

  const hideFooter =
    authPages.includes(pathname) ||
    dashboardPages;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">

      {!hideNavbar && <Navbar />}

      <main
        className={
          hideNavbar
            ? ""
            : "pt-16"
        }
      >
        <Outlet />
      </main>

      {!hideFooter && <Footer />}

    </div>
  );
}