import Layout from "../AdminLayout";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const { register, handleSubmit, reset } = useForm();

  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();

  const resetForm = useCallback(() => {
    if (!detail) {
      return;
    }
    reset({
      fullName: detail.fullName || "",
      gender: detail.gender || "",
      birthDate: detail.birthDate ? String(detail.birthDate).slice(0, 10) : "",
      email: detail.email || "",
      phone: detail.phone || "",
      department: detail.department || "",
      position: detail.position || "",
      salary: detail.salary || "",
      address: detail.address || "",
      joinDate: detail.joinDate ? String(detail.joinDate).slice(0, 10) : "",
    });
  }, [detail, reset]);

  const loadData = useCallback(() => {
    return axios
      .get(`${import.meta.env.VITE_API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((resp) => {
        setDetail(resp.data.data);
      });
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    document.title = "Edit Karyawan - SISMAKER";
  }, []);

  const [emailValidation, setEmailValidation] = useState(null);

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}/edit/${id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        navigate(`/detail-employee/${id}`, { state: true });
      })
      .catch((error) => {
        console.error("There was an error creating the employee!", error);
      })
      .finally(() => {
        loadData();
        resetForm();
        setLoading(false);
      });
  };

  const uniqueValidation = (typeOfValidation, value) => {
    if (!value) {
      return;
    }
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/validate/${typeOfValidation}`,
        { value },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      )
      .then(() => {
        setEmailValidation(null);
      })
      .catch((error) => {
        const conflict = error?.response?.data?.conflict;
        if (conflict === "email") {
          setEmailValidation("Email tersebut telah digunakan");
          return;
        }
        setEmailValidation("Email tersebut telah digunakan");
      });
  };

  return (
    <Layout pageTitle={"edit-employee"}>
      <main className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold">Edit Data Karyawan</h1>
            <p className="mt-1 text-sm text-slate-600">
              Perbarui informasi karyawan
            </p>
          </div>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4">
          {/* Main panel */}
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="flex flex-col col-span-2 gap-1">
                  <label className="text-sm text-slate-600">Nama Lengkap</label>
                  <input
                    type="text"
                    {...register("fullName", { required: true })}
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-slate-600">
                    Jenis Kelamin
                  </label>
                  <div className="flex gap-5">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        {...register("gender", { required: true })}
                        value="l"
                        id="gender-l"
                      />
                      <label htmlFor="gender-l">Laki-laki</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        {...register("gender", { required: true })}
                        value="p"
                        id="gender-p"
                      />
                      <label htmlFor="gender-p">Perempuan</label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-slate-600">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    {...register("birthDate", { required: true })}
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-slate-600">Alamat Email</label>
                  {emailValidation && (
                    <span className="text-xs text-red-400">
                      {emailValidation}
                    </span>
                  )}
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    onBlur={(e) => uniqueValidation("email", e.target.value)}
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-slate-600">Nomor HP</label>
                  <input
                    type="number"
                    {...register("phone", { required: true })}
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-slate-600">Departemen</label>
                  <select
                    {...register("department", { required: true })}
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  >
                    <option value="HRGA">HRGA</option>
                    <option value="Akunting">Akunting</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="IT">IT</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-slate-600">Posisi</label>
                  <select
                    {...register("position", { required: true })}
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  >
                    <option value="Fullstack">Fullstack</option>
                    <option value="Backend">Backend</option>
                    <option value="Fron End">Fron End</option>
                    <option value="Kepala Pendidikan">Kepala Pendidikan</option>
                    <option value="Kepala Marketing">Kepala Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Finance">Finance</option>
                    <option value="HRGA">HRGA</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-slate-600">
                    Tanggal Bergabung
                  </label>
                  <input
                    type="date"
                    {...register("joinDate", { required: true })}
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-slate-600">Gaji</label>
                  <input
                    type="number"
                    {...register("salary", { required: true })}
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-4">
                  <label className="text-sm text-slate-600">
                    Alamat Lengkap
                  </label>
                  <textarea
                    rows="4"
                    {...register("address", { required: true })}
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="col-span-4">
                  <button
                    type="submit"
                    className="p-2 bg-slate-900 text-white rounded w-full hover:bg-slate-800 cursor-pointer transition-all"
                  >
                    {loading ? "Menyimpan..." : "Simpan Perubahan"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default EditEmployee;
