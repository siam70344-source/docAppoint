import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logOut();
    toast.success("Logged out successfully!");
    navigate("/");
    setDropdownOpen(false);
  };

  const navLinks = [
    { to: "/",            label: "Home"             },
    { to: "/appointments", label: "All Appointments" },
    { to: "/dashboard",   label: "Dashboard"        },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="font-display text-xl font-bold text-dark-800">
            Doc<span className="text-primary-600">Appoint</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${isActive
                  ? "text-primary-600 bg-primary-50"
                  : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1 pr-3 rounded-full border border-gray-200 hover:border-primary-300 transition-all"
              >
                <img
                  src={user.photoURL || "https://i.ibb.co/placeholder.jpg"}
                  alt={user.displayName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                  {user.displayName?.split(" ")[0]}
                </span>
                <FiChevronDown className="text-gray-400 text-sm" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-12 bg-white rounded-xl shadow-lg border border-gray-100 py-2 w-48 z-50">
                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    My Profile
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                  <img
  src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "User")}&background=00a76f&color=fff&bold=true`}
  alt={user.displayName}
  onError={(e) => {
    e.target.onerror = null; // Prevents infinite loops if the fallback fails
    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "User")}&background=00a76f&color=fff&bold=true`;
  }}
  className="w-8 h-8 rounded-full object-cover"
/>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-outline text-sm py-2">
                Login
              </Link>
              <Link to="/register" className="btn-primary text-sm py-2">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 text-xl p-2"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg text-sm font-medium
                ${isActive
                  ? "text-primary-600 bg-primary-50"
                  : "text-gray-600"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <hr className="border-gray-100" />
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-500"
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-2 pt-2">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="btn-outline text-sm py-2 flex-1 text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="btn-primary text-sm py-2 flex-1 text-center"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;