import IconX from "./icons/IconX";
import IconGrid from "./icons/IconGrid";
import IconUsers from "./icons/IconUser";
import IconPlus from "./icons/IconPlus";
import IconShield from "./icons/IconShield";
import IconCog from "./icons/IconCog";

const Sidebar = ({ isOpen, action }) => {
  return (
    <aside>
      {/* Mobile drawer */}
      <div
        className={[
          "fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transition-transform lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Sidebar"
      >
        <div className="flex h-14 items-center justify-between border-b border-slate-200 px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-slate-900" />
            <div className="leading-tight">
              <div className="text-sm font-semibold">SISMAKER</div>
              <div className="text-[11px] text-slate-500">Dashboard</div>
            </div>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
            onClick={() => action(false)}
            aria-label="Close sidebar"
          >
            <IconX />
          </button>
        </div>

        <nav className="p-4">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Menu Utama
          </div>
          <div className="mt-2 space-y-1">
            <NavItem active icon={<IconGrid />} label="Dashboard" />
            <NavItem icon={<IconUsers />} label="Employees" />
            <NavItem icon={<IconPlus />} label="Add Employee" />
          </div>

          <div className="mt-6 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Settings
          </div>
          <div className="mt-2 space-y-1">
            <NavItem icon={<IconShield />} label="Roles & Access" />
            <NavItem icon={<IconCog />} label="Preferences" />
          </div>
        </nav>

        <div className="absolute bottom-0 w-full border-t border-slate-200 p-4 text-xs text-slate-500">
          © {new Date().getFullYear()} • Tailwind Template
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-14 items-center gap-2 border-b border-slate-200 px-4">
          <div className="h-8 w-8 rounded-lg bg-slate-900" />
          <div className="leading-tight">
            <div className="text-sm font-semibold">SISMAKER</div>
            <div className="text-[11px] text-slate-500">
              Sistem Manajemen Pekerja
            </div>
          </div>
        </div>

        <nav className="p-4">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Menu Utama
          </div>
          <div className="mt-2 space-y-1">
            <NavItem active icon={<IconGrid />} label="Dashboard" />
            <NavItem icon={<IconUsers />} label="Employees" />
            <NavItem icon={<IconPlus />} label="Add Employee" />
          </div>

          <div className="mt-6 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Settings
          </div>
          <div className="mt-2 space-y-1">
            <NavItem icon={<IconShield />} label="Roles & Access" />
            <NavItem icon={<IconCog />} label="Preferences" />
          </div>
        </nav>
      </div>
    </aside>
  );
};

function NavItem({ icon, label, active }) {
  return (
    <button
      type="button"
      className={[
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
        active
          ? "bg-slate-100 text-slate-900"
          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
      ].join(" ")}
    >
      <span className="text-slate-600">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export default Sidebar;
