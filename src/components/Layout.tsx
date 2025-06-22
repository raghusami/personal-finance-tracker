import Sidebar from "./Sidebar";
import Topbar from "./Topbar"; // <-- You already imported this
import Footer from "./Footer"; // Assuming you have a Footer component
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content Area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Topbar: Search, Notification, Profile */}
          <Topbar />

          {/* Outlet for page content */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {/* Layout.tsx or App.tsx */}
           <div id="daisy-toast" className="toast toast-top toast-end z-50" />

            <Outlet />
          </main>
           <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
