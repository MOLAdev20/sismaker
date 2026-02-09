import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

const Layout = ({ children, pageTitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Optional: auto-close mobile drawer kalau pindah ke layar besar
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Overlay (mobile) */}
      <div
        className={[
          "fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden",
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar (mobile drawer + desktop static) */}
      <Sidebar
        isOpen={sidebarOpen}
        activeMenu={pageTitle}
        action={setSidebarOpen}
      />
      {/* Main area (shifted right on desktop) */}

      <div className="lg:pl-72">
        {/* Topbar */}
        <Topbar setSidebarOpen={setSidebarOpen} />
        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
