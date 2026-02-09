import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../AdminLayout";
import StatCard from "../components/StatCard";
import axios from "axios";
import { Link } from "react-router-dom";
import IconPlus from "../components/icons/IconPlus";
import IconCheck from "../components/icons/IconCheck";
import Modal from "../components/Modal";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [statistic, setStatistic] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });
  const [filters, setFilters] = useState({
    dept: "",
    q: "",
  });
  const initialFiltersRef = useRef(filters);

  const navigate = useNavigate();
  const { state } = useLocation();

  const fetchEmployees = useCallback(
    (activeFilters) => {
      axios
        .get(`${import.meta.env.VITE_API_URL}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            ...(activeFilters.dept && { dept: activeFilters.dept }),
            ...(activeFilters.gender && { gender: activeFilters.gender }),
            ...(activeFilters.q && { q: activeFilters.q }),
          },
        })
        .then((response) => {
          setData(response.data.data);
          setStatistic({
            total: response.data.stat.total,
            active: response.data.stat.active,
            inactive: response.data.stat.inactive,
          });
        })
        .catch((error) => {
          if (error?.response?.status === 401) {
            navigate("/login");
          }
        });
    },
    [navigate],
  );

  useEffect(() => {
    document.title = "Data Karyawan - SISMAKER";
  }, []);

  useEffect(() => {
    fetchEmployees(initialFiltersRef.current);
  }, [fetchEmployees]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    if (key == "dept") {
      setPosition(availableDepts[value]);

      if (value == "") {
      }
    }
  };

  const applyFilters = () => {
    fetchEmployees(filters);
  };

  const removeFlashData = () => {
    navigate(location.pathname, { replace: true, state: null });
  };

  return (
    <Layout pageTitle={"manage-employee"}>
      <main className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold">Data Karyawan</h1>
            <p className="mt-1 text-sm text-slate-600">
              Lihat data dan statistik seluruh karyawan
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to={"/create-employee"}
              className="rounded-lg flex justify-center gap-1 bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              <IconPlus /> Tambah Karyawan
            </Link>
          </div>
        </div>

        {/* Stats cards */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard title="Total Karyawan" value={statistic.total} />
          <StatCard title="Karyawan Aktif" value={statistic.active} />
          <StatCard title="Karyawan Nonaktif" value={statistic.inactive} />
        </section>

        {/* Two-column area */}
        <section className="mt-6 grid grid-cols-1 gap-4">
          {/* Main panel */}
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white">
            <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold">Tabel Karyawan</div>
                <div className="text-xs text-slate-500">
                  Sajian data seluruh karyawan
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200 sm:w-64"
                  placeholder="cari nama, posisi atau ID Karyawan..."
                  value={filters.q}
                  onChange={(e) => updateFilter("q", e.target.value)}
                />
                <div className="flex gap-2">
                  <select
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    value={filters.dept}
                    onChange={(e) => updateFilter("dept", e.target.value)}
                  >
                    <option value="">Departemen: Semua</option>
                    <option value="HRGA">HRGA</option>
                    <option value="Akunting">Akunting</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="IT">IT</option>
                  </select>
                  <button
                    type="button"
                    onClick={applyFilters}
                    className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto p-4">
              {data.length == 0 || !data ? (
                <div className="flex flex-col gap-2 p-5 w-full items-center justify-center text-sm text-slate-500">
                  <p>
                    Tidak ada data data karyawan. Klik Tombol dibawah untuk
                    menambah karyawan baru
                  </p>
                  <Link
                    to="/create-employee"
                    className="p-2 text-xs bg-slate-900 flex items-center gap-1 text-white rounded-lg hover:bg-slate-800"
                  >
                    <IconPlus /> Tambah Karyawan
                  </Link>
                </div>
              ) : (
                <>
                  <table className="min-w-full text-left text-sm">
                    <thead className="border-b border-slate-200 text-slate-600">
                      <tr>
                        <th className="py-2 pr-4">ID Karyawan</th>
                        <th className="py-2 pr-4">Nama Lengkap</th>
                        <th className="py-2 pr-4">Departemen</th>
                        <th className="py-2 pr-4">Posisi</th>
                        <th className="py-2 pr-4">Status</th>
                        <th className="py-2 pr-0">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((e) => (
                        <tr
                          key={e.employeeId}
                          className="border-b border-slate-100"
                        >
                          <td className="py-3 pr-4` font-mono text-xs text-slate-700">
                            {e.employeeId}
                          </td>
                          <td className="py-3 pr-4">
                            <div className="font-medium">{e.fullName}</div>
                            <div className="text-xs text-slate-500">
                              {e.email.toLowerCase().replace(" ", ".")}
                            </div>
                          </td>
                          <td className="py-3 pr-4">{e.department}</td>
                          <td className="py-3 pr-4">{e.position}</td>
                          <td className="py-3 pr-4">
                            <StatusPill status={e.status} />
                          </td>
                          <td className="py-3 pr-0">
                            <Link
                              to={`/detail-employee/${e.id}`}
                              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs hover:bg-slate-50"
                            >
                              Lihat
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
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
                <span className="text-md">Data karyawan berhasil diinput!</span>
              </div>
            </Modal>
          )}
        </section>
      </main>
    </Layout>
  );
};

function StatusPill({ status }) {
  const isActive = status === "ACTIVE";
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        isActive
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-700",
      ].join(" ")}
    >
      {status}
    </span>
  );
}

export default Dashboard;
