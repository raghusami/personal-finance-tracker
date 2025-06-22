// components/Topbar.tsx
import { FiBell, FiSettings, FiMessageSquare } from "react-icons/fi";
import { BsSun } from "react-icons/bs";

const Topbar = () => {
  return (
    <div className="navbar bg-base-100 border-b border-gray-200 px-6 sticky top-1 z-50 h-16">
      {/* Left spacer (or logo if needed later) */}
      <div className="flex-1" />

      {/* Right: Icons + User */}
      <div className="flex items-center gap-4">
        {/* Theme Switch */}
        <button className="btn btn-ghost btn-circle">
          <BsSun size={18} />
        </button>

        {/* Chat Icon */}
        <button className="btn btn-ghost btn-circle">
          <FiMessageSquare size={18} />
        </button>

        {/* Settings Icon */}
        <button className="btn btn-ghost btn-circle">
          <FiSettings size={18} />
        </button>

        {/* Notification Icon */}
        <div className="relative">
          <button className="btn btn-ghost btn-circle">
            <FiBell size={18} />
          </button>
          <span className="badge badge-xs badge-error absolute top-1 right-1"></span>
        </div>

        {/* User Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="flex items-center cursor-pointer gap-2">
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://i.pravatar.cc/100?img=12" alt="User Avatar" />
              </div>
            </div>
            <div className="hidden lg:flex flex-col text-right text-sm leading-tight">
              <span className="font-semibold">Denish</span>
              <span className="text-xs text-gray-500">Profile</span>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><a>Profile</a></li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
