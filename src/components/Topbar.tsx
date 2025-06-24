import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBell, FiSettings, FiMessageSquare } from "react-icons/fi";
import { BsSun, BsMoon } from "react-icons/bs";

const Topbar = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/users/profile");
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  return (
    <div className="navbar bg-base-100 border-b border-base-300 px-4 md:px-6 sticky top-0 z-50">
      <div className="flex-1" />

      <div className="flex items-center gap-3">
        {/* 🌗 Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle Theme"
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <BsMoon size={18} /> : <BsSun size={18} />}
        </button>

        {/* 📬 Messages */}
        <button className="btn btn-ghost btn-circle" aria-label="Messages" title="Messages">
          <FiMessageSquare size={18} />
        </button>

        {/* ⚙️ Settings */}
        <button className="btn btn-ghost btn-circle" aria-label="Settings" title="Settings">
          <FiSettings size={18} />
        </button>

        {/* 🔔 Notifications */}
        <div className="relative">
          <button className="btn btn-ghost btn-circle" aria-label="Notifications" title="Notifications">
            <FiBell size={18} />
          </button>
          <span className="badge badge-xs badge-error absolute top-1 right-1" />
        </div>

        {/* 👤 User Menu */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://i.pravatar.cc/100?img=12" alt="User Avatar" />
            </div>
          </label>

          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content mt-3 z-[100] p-2 shadow-lg bg-base-100 rounded-box w-48"
          >
            <li><button onClick={handleProfileClick}>👤 Profile</button></li>
            <li><button>⚙️ Settings</button></li>
            <li><button onClick={handleLogout}>🚪 Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
