import IconMenu from "../components/icons/IconMenu";

const Topbar = ({ setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <IconMenu />
          </button>

          <div className="leading-tight">
            <div className="text-sm font-semibold">SISMAKER</div>
            <div className="text-xs text-slate-500">
              Sistem Manajemen Pekerja
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* User chip */}
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5">
            <div className="h-7 w-7 rounded-full bg-slate-200" />
            <div className="leading-tight">
              <div className="text-xs font-medium">Admin</div>
              <div className="text-[11px] text-slate-500">
                admin@example.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
