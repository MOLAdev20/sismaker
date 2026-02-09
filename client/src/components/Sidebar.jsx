import IconX from "./icons/IconX";
import IconUser from "./icons/IconUser";
import IconPlus from "./icons/IconPlus";
import IconShield from "./icons/IconShield";
import { Link } from "react-router-dom";
import IconLogout from "./icons/IconLogout";
import Modal from "./Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import AccountSetting from "../pages/AccountSetting";

const Sidebar = ({ isOpen, activeMenu, action }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const navigate = useNavigate();

  const confirmLogout = () => {
    setShowConfirmDialog(false);
    localStorage.clear();
    navigate("/login");
  };

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
            Manajemen Karyawan
          </div>
          <div className="mt-2 space-y-1">
            <NavItem
              active={[
                "manage-employee",
                "detail-employee",
                "edit-employee",
              ].includes(activeMenu)}
              icon={<IconUser />}
              label="Data Karyawan"
              target={"/dashboard"}
            />
            <NavItem
              active={activeMenu == "create-employee"}
              target={"/create-employee"}
              icon={<IconPlus />}
              label="Tambah Karyawan"
            />
          </div>

          <div className="mt-6 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Akun Pribadi
          </div>
          <div className="mt-2 space-y-1">
            <NavItem
              active={activeMenu == "account-settings"}
              icon={<IconShield />}
              target={"/account-settings"}
              label="Pengaturan Akun"
            />
          </div>
          <button
            onClick={() => setShowConfirmDialog(true)}
            className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          >
            <IconLogout /> Keluar
          </button>
        </nav>

        <div className="absolute bottom-0 w-full border-t border-slate-200 p-4 text-xs text-slate-500">
          © {new Date().getFullYear()} • Tailwind Template
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-14 items-center gap-2 border-b border-slate-200 px-4">
          <div className="leading-tight">
            <div className="text-sm font-semibold">SISMAKER</div>
            <div className="text-[11px] text-slate-500">
              Sistem Manajemen Pekerja
            </div>
          </div>
        </div>

        <nav className="p-4">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Manajemen Karyawan
          </div>
          <div className="mt-2 space-y-1">
            <NavItem
              active={[
                "manage-employee",
                "detail-employee",
                "edit-employee",
              ].includes(activeMenu)}
              icon={<IconUser />}
              label="Data Karyawan"
              target={"/dashboard"}
            />
            <NavItem
              active={activeMenu == "create-employee"}
              target={"/create-employee"}
              icon={<IconPlus />}
              label="Tambah Karyawan"
            />
          </div>

          <div className="mt-6 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Akun Pribadi
          </div>
          <div className="mt-2 space-y-1">
            <NavItem
              active={activeMenu == "account-settings"}
              icon={<IconShield />}
              target={"/account-settings"}
              label="Pengaturan Akun"
            />
          </div>
          <button
            onClick={() => setShowConfirmDialog(true)}
            className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          >
            <IconLogout /> Keluar
          </button>
        </nav>
      </div>

      <Modal
        open={showConfirmDialog}
        title="Keluar?"
        onClose={() => setShowConfirmDialog(false)}
        footer={
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setShowConfirmDialog(false)}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Tidak
            </button>
            <button
              type="button"
              onClick={confirmLogout}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
            >
              Ya, Keluar
            </button>
          </div>
        }
      >
        <div className="text-sm text-center px-10 text-slate-600">
          Apakah anda yakin ingin keluar akun?
        </div>
      </Modal>
    </aside>
  );
};

function NavItem({ icon, label, active, target }) {
  return (
    <Link
      to={target}
      className={[
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
        active
          ? "bg-slate-100 text-slate-900"
          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
      ].join(" ")}
    >
      <span className="text-slate-600">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

export default Sidebar;
