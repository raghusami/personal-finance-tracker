import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen bg-base-100 text-base-content">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Topbar: Search, Notification, Profile */}
          <Topbar />

          {/* Main Page Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-base-200">
            {/* Toast notifications */}
           <div id="daisy-toast" className="fixed top right-4 z-50 max-w-sm w-full"></div>
            <Outlet />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
