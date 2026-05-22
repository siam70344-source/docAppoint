import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiCalendar, FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import toast from "react-hot-toast";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logOut();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const navLinks = [
    { to: "/dashboard/bookings", icon: <FiCalendar />, label: "My Bookings" },
    { to: "/dashboard/profile",  icon: <FiUser />,     label: "My Profile"  },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-dark-800 text-white transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <span className="font-display text-xl font-bold text-primary-400">
            DocAppoint
          </span>
          <p className="text-xs text-gray-400 mt-1">Dashboard</p>
        </div>

        {/* User info */}
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <img
            src={user?.photoURL || "https://i.ibb.co/placeholder.jpg"}
            alt={user?.displayName}
            className="w-10 h-10 rounded-full object-cover border-2 border-primary-400"
          />
          <div>
            <p className="text-sm font-medium truncate w-36">
              {user?.displayName || "User"}
            </p>
            <p className="text-xs text-gray-400 truncate w-36">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="p-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${isActive
                  ? "bg-primary-600 text-white"
                  : "text-gray-300 hover:bg-white/10"
                }`
              }
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all"
          >
            <FiLogOut className="text-lg" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-600 hover:text-primary-600"
          >
            <FiMenu className="text-xl" />
          </button>
          <h1 className="font-display text-xl font-semibold text-dark-800">
            Dashboard
          </h1>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;