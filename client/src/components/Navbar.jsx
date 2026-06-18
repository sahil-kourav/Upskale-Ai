import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";
import { PencilSparkles } from "lucide-react";
import Loading from "./Loading";
import { notify } from "../utils/toast";

export default function Navbar() {
  const { user, loading, handleLogout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logoutUser = async () => {
    try {
      await handleLogout();

      notify.success(notify.loading(), "Logged out");

      navigate("/", {
        replace: true,
      });
    } catch {
      notify.error(notify.loading(), "Logout failed");
    }
  };

  const guestLinks = ["Home", "Features", "How It Works"];

  const userLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Reports",
      path: "/reports",
    },
    {
      name: "Create Report",
      path: "/create-report",
    },
  ];

  if (loading) return null;

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition ${
        scrolled
          ? "bg-[#0a0a12]/90 border-b border-white/5 backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center group">
          {/* Logo */}
          <div className="flex items-center justify-center transition mr-2 group-hover:scale-105">
            <PencilSparkles className="w-5 h-5" />
          </div>

          <div>
            <h3 className="text-gray-300 text-lg font-semibold tracking-tight">
              Upskale AI
            </h3>
          </div>
        </Link>

        {/* Nav */}
        <div className="hidden md:flex items-center gap-8">
          {!user
            ? guestLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replaceAll(" ", "-")}`}
                  className="text-md text-gray-300 hover:text-white"
                >
                  {link}
                </a>
              ))
            : userLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-md text-gray-300 hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
        </div>

        {/* Right */}
        {!loading && (
          <div className="flex gap-3">
            {!user ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-gray-300 cursor-pointer px-4 py-2"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer px-5 py-2 rounded-lg text-white"
                >
                  Get Started
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="
    flex items-center gap-2
    px-5 py-1.5
    rounded-xl 
    border border-[#2a3348]
    bg-[#111827] cursor-pointer
    text-gray-200
    shadow-sm
    transition-all duration-300
    hover:bg-[#1b2233]
    hover:border-red-500/40
    hover:text-red-400
    active:scale-[0.98]
  "
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
