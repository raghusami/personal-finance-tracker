// components/Sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FiHome, FiDollarSign, FiFileText, FiSettings, FiHelpCircle } from "react-icons/fi";
import { BsPiggyBank } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import clsx from "clsx";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuSections = [
    {
      title: "Apps",
      items: [
        { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
        { name: "Income", path: "/salary/list", icon: <FiDollarSign /> },
        { name: "Expense", path: "/expenses/list", icon: <FiFileText /> },
        { name: "Saving", path: "/savings/list", icon: <BsPiggyBank /> },
        { name: "Saving Payments", path: "/saving-payments/list", icon: <FiFileText /> },
        { name: "Investments", path: "/investments/list", icon: <FiDollarSign /> }
      ],
    },
    {
      title: "Other",
      items: [
        { name: "Settings", path: "/categorymanager", icon: <FiSettings /> },
        { name: "Get Help", path: "/help", icon: <FiHelpCircle /> },
      ],
    },
  ];

  return (
    <aside
      className={clsx(
        "bg-base-100 border-r border-base-200 h-screen flex flex-col shadow-md transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5">
        {!collapsed && (
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent flex items-center gap-2">
            💼 FinVista
          </span>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="text-xl text-base-content">
          <AiOutlineMenu />
        </button>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto">
        {menuSections.map((section, index) => (
          <div key={index} className="px-3 pt-4">
            {!collapsed && (
              <p className="text-xs uppercase text-base-content/60 mb-2 px-2">
                {section.title}
              </p>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.name} className="group relative">
                    <Link
                      to={item.path}
                      className={clsx(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary text-primary-content shadow"
                          : "text-base-content hover:bg-base-200 hover:text-primary"
                      )}
                      title={collapsed ? item.name : ""}
                    >
                      <span className={clsx("text-lg", isActive ? "text-primary-content" : "text-base-content")}>
                        {item.icon}
                      </span>
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                    {isActive && (
                      <span className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-lg"></span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-base-200 p-4">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://i.pravatar.cc/100?img=12" alt="Profile" />
            </div>
          </div>
          {!collapsed && (
            <div className="flex flex-col text-sm leading-tight text-base-content">
              <span className="font-semibold">Denish N</span>
              <span className="text-xs opacity-60">@withden</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
