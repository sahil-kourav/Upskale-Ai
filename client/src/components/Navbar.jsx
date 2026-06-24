import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";
import {
  PencilSparkles,
  Coins,
  Menu,
  X,
} from "lucide-react";
import { notify } from "../utils/toast";

export default function Navbar() {
  const { user, loading, handleLogout } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const logoutUser = async () => {
    try {
      const id = notify.loading("Logging out...");

      await handleLogout();

      notify.success(id, "Logged out");

      navigate("/");
    } catch {
      notify.error(notify.loading(), "Logout failed");
    }
  };

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Reports",
      path: "/reports",
    },
    {
      name: "Create",
      path: "/create-report",
    },
    {
      name: "Interview",
      path: "/mock-interview",
    },
    {
      name: "History",
      path: "/mock-interview-history",
    },
  ];

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);


  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-[#050814]/70 border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <PencilSparkles
              className="w-5 h-5 text-white"
            />

            <span className="text-white font-semibold">
              Upskale AI
            </span>
          </Link>

          {/* Desktop Nav */}
          {user && (
            <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-7">
              {links.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm transition ${
                    isActive(item.path)
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">

            {!user ? (
              <>
                <button
                  onClick={() =>
                    navigate("/login")
                  }
                  className="text-gray-300"
                >
                  Login
                </button>

                <button
                  onClick={() =>
                    navigate("/register")
                  }
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white"
                >
                  Get Started
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/pricing"
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20"
                >
                  <Coins size={16} />

                  {user?.credits ?? 0}

                  <span className="hidden xl:block">
                    Credits
                  </span>
                </Link>

                <button
                  onClick={logoutUser}
                  className="px-4 py-2 rounded-xl border border-white/10 hover:border-red-500"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
            className="md:hidden text-white"
          >
            {mobileOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}

      <div
        className={`fixed top-0 right-0 h-screen w-[85%] max-w-[320px]
 bg-[#080c16]
        z-[60]
        transition-transform duration-300
        ${
          mobileOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="p-6">

          <div className="flex justify-between">
              <Link
                  to="/pricing"
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-900 border border-emerald-500/20"
                >
                  <Coins size={16} />

                  {user?.credits ?? 0}

                  <span className="">
                    Credits
                  </span>
                </Link>
            <button
              onClick={() =>
                setMobileOpen(false)
              }
            >
              <X />
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-3">

            {user &&
              links.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`p-3 rounded-xl ${
                    isActive(item.path)
                      ? "text-white font-semibold"
                      : "text-gray-400"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

            {!user ? (
              <>
                <button
                  onClick={() =>
                    navigate("/login")
                  }
                  className="w-full p-3 border rounded-xl"
                >
                  Login
                </button>

                <button
                  onClick={() =>
                    navigate("/register")
                  }
                  className="w-full p-3 rounded-xl bg-indigo-600"
                >
                  Get Started
                </button>
              </>
            ) : (
              <>
              
                <button
                  onClick={logoutUser}
                  className="p-3 rounded-xl border border-red-500"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          onClick={() =>
            setMobileOpen(false)
          }
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}
    </>
  );
}

