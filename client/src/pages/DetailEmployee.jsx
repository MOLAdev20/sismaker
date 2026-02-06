import Layout from "../AdminLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import IconCheck from "../components/icons/IconCheck";

const DetailEmployee = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { state } = useLocation();

  useEffect(() => {
    document.title = "Detail Karyawan - SISMAKER";
    axios
      .get(`${import.meta.env.VITE_API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setDetail(response.data.data);
      });
  }, []);

  const performDelete = () => {
    setIsDeleteOpen(false);
    setLoading(true);
    axios
      .delete(`${import.meta.env.VITE_API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        navigate("/dashboard");
      })
      .catch(() => {
        alert("Gagal menghapus karyawan");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function removeFlashData() {
    navigate(location.pathname, { replace: true, state: null });
  }

  return (
    <Layout pageTitle={"detail-employee"}>
      <main className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold">Detail Karyawan</h1>
            <p className="mt-1 text-sm text-slate-600">
              Edit, hapus, atau lihat detail karyawan
            </p>
          </div>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4">
          {/* Main panel */}
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white">
            <div className="flex justify-between px-5 sm:p-6">
              <h4>Detail Karyawan</h4>
              <Link
                className="text-sm text-blue-400"
                to={`/edit-employee/${detail.id}`}
              >
                Edit data karyawan
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 sm:p-6 lg:grid-cols-2">
              <Card label="Employee ID" value={detail.employeeId} />
              <Card label="Full Name" value={detail.fullName} />
              <Card
                label="Gender"
                value={detail.gender === "l" ? "Pria" : "Wanita"}
              />
              <Card label="Email" value={detail.email} />
              <Card label="Phone" value={detail.phone || "-"} />
              <Card label="Department" value={detail.department} />
              <Card label="Position" value={detail.position} />
              <Card
                label="Join Date"
                value={new Date(detail.joinDate).toLocaleDateString("id-ID")}
              />
              <div className="rounded-lg border border-slate-200 p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  STATUS
                </div>
                <div className="mt-2 text-sm text-slate-700 flex items-center justify-between">
                  <span>{detail.status}</span>
                  <button className="text-xs text-slate-500 p-1 border border-slate-200 rounded cursor-pointer active:scale-95">
                    {detail.status === "ACTIVE" ? "Nonaktifkan" : "Aktifkan"}
                  </button>
                </div>
              </div>
              <Card label="Address" value={detail.address || "-"} />
              <Card
                label="Birth Date"
                value={
                  new Date(detail.birthDate).toLocaleDateString("id-ID") || "-"
                }
              />
              <Card label="Salary" value={detail.salary || "-"} />
              <button
                onClick={() => setIsDeleteOpen(true)}
                className="mt-4 col-span-2 rounded bg-red-100 px-4 py-2 text-red-500 hover:bg-red-200"
              >
                Hapus Karyawan
              </button>
            </div>
          </div>
        </section>

        {state && (
          <Modal
            open={true}
            title="Berhasil"
            onClose={removeFlashData}
            footer={
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={removeFlashData}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Oke, Saya Mengerti
                </button>
              </div>
            }
          >
            <div className="flex flex-col text-center items-center gap-2 px-10 text-slate-600">
              <IconCheck className="h-20 w-20 text-green-500" />
              <span className="text-md">
                Informasi karyawan berhasil diperbarui
              </span>
            </div>
          </Modal>
        )}

        <Modal
          open={isDeleteOpen}
          title="Hapus karyawan?"
          onClose={() => setIsDeleteOpen(false)}
          footer={
            <div className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={performDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                Ya, Hapus
              </button>
            </div>
          }
        >
          <div className="text-sm text-center px-10 text-slate-600">
            Seluruh data yang berkaitan juga akan dihapus permanen dari sistem.
          </div>
        </Modal>
      </main>
    </Layout>
  );
};

function Card({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-sm text-slate-700">{value}</div>
    </div>
  );
}

export default DetailEmployee;
