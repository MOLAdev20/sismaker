import Layout from "../AdminLayout";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [idValidation, setIdValidation] = useState(null);
  const [emailValidation, setEmailValidation] = useState(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}/`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        navigate("/dashboard", { state: true });
      })
      .catch((error) => {
        console.error("There was an error creating the employee!", error);
      })
      .finally(() => {
        reset();
        setLoading(false);
      });
  };

  const uniqueValidation = (typeOfValidation, value) => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/validate/${typeOfValidation}`,
        { value },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      )
      .then(() => {
        if (typeOfValidation == "employeeId") {
          setIdValidation(null);
        } else {
          setEmailValidation(null);
        }
      })
      .catch((error) => {
        if (error.response.data.conflict == "employeeId") {
          setIdValidation("ID Pegawai tersebut sudah digunakan");
        } else {
          setEmailValidation("Email tersebut telah digunakan");
        }
      });
  };

  useEffect(() => {
    document.title = "Input Karyawan - SISMAKER";
  }, []);

  return (
    <Layout pageTitle={"create-employee"}>
      <main className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold">Input Data Karyawan</h1>
            <p className="mt-1 text-sm text-slate-600">
              Buat data karyawan baru di sini
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
              <div className="">
                <div className="text-sm font-semibold">Form Karyawan</div>
                <div className="text-xs text-slate-500">
                  List layout + filters (template)
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-5">
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-slate-600">ID Pegawai</label>
                  {errors.employeeId && (
                    <span className="text-xs text-red-400">
                      {errors.employeeId.message}
                    </span>
                  )}
                  {idValidation && (
                    <span className="text-xs text-red-400">{idValidation}</span>
                  )}
                  <input
                    type="text"
                    {...register("employeeId", {
                      required: "Field ini wajib diisi",
                    })}
                    onBlur={(e) =>
                      uniqueValidation("employeeId", e.target.value)
                    }
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-slate-600">Nama Lengkap</label>
                  {errors.fullName && (
                    <span className="text-xs text-red-400">
                      {errors.fullName.message}
                    </span>
                  )}
                  <input
                    type="text"
                    {...register("fullName", {
                      required: "Field ini wajib diisi",
                      min: { message: "Minimal 4 karakter", value: "4" },
                    })}
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-slate-600">
                    Jenis Kelamin
                  </label>
                  {errors.gender && (
                    <span className="text-xs text-red-400">
                      {errors.gender.message}
                    </span>
                  )}
                  <div className="flex gap-5">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        {...register("gender", {
                          required: "Pilih salah satu",
                        })}
                        defaultValue={"l"}
                        id="gender-l"
                      />
                      <label htmlFor="gender-l">Laki-laki</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        {...register("gender", {
                          required: "Pilih salah satu",
                        })}
                        defaultValue={"p"}
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
                  {errors.birthDate && (
                    <span className="text-xs text-red-400">
                      {errors.birthDate.message}
                    </span>
                  )}
                  <input
                    type="date"
                    {...register("birthDate", {
                      required: "Field ini wajib diisi",
                    })}
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-slate-600">Alamat Email</label>
                  {errors.email && (
                    <span className="text-xs text-red-400">
                      {errors.email.message}
                    </span>
                  )}
                  {emailValidation && (
                    <span className="text-xs text-red-400">
                      {emailValidation}
                    </span>
                  )}
                  <input
                    type="email"
                    {...register("email", {
                      required: "Field ini wajib diisi",
                    })}
                    onBlur={(e) => uniqueValidation("email", e.target.value)}
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-slate-600">Nomor HP</label>
                  {errors.phone && (
                    <span className="text-xs text-red-400">
                      {errors.phone.message}
                    </span>
                  )}
                  <input
                    type="phonel"
                    {...register("phone", {
                      required: "Field ini wajib diisi",
                    })}
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-slate-600">Departemen</label>
                  {errors.department && (
                    <span className="text-xs text-red-400">
                      {errors.department.message}
                    </span>
                  )}
                  <select
                    {...register("department", {
                      required: "Field ini wajib diisi",
                    })}
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  >
                    <option>Pilih</option>
                    <option value="HRGA">HRGA</option>
                    <option value="Akunting">Akunting</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="IT">IT</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-slate-600">Posisi</label>
                  {errors.position && (
                    <span className="text-xs text-red-400">
                      {errors.position.message}
                    </span>
                  )}
                  <select
                    {...register("position", {
                      required: "Field ini wajib diisi",
                    })}
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
                  {errors.joinDate && (
                    <span className="text-xs text-red-400">
                      {errors.joinDate.message}
                    </span>
                  )}
                  <input
                    type="date"
                    {...register("joinDate", {
                      required: "Field ini wajib diisi",
                    })}
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-slate-600">Gaji</label>
                  {errors.salary && (
                    <span className="text-xs text-red-400">
                      {errors.salary.message}
                    </span>
                  )}
                  <input
                    type="number"
                    {...register("salary", {
                      required: "Field ini wajib diisi",
                    })}
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-4">
                  <label className="text-sm text-slate-600">
                    Alamat Lengkap
                  </label>
                  {errors.address && (
                    <span className="text-xs text-red-400">
                      {errors.address.message}
                    </span>
                  )}
                  <textarea
                    rows="4"
                    {...register("address", {
                      required: "Masukan alamat lengkap Anda",
                    })}
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="col-span-4">
                  <button
                    type="submit"
                    className="p-2 bg-slate-900 text-white rounded w-full hover:bg-slate-800 cursor-pointer transition-all"
                  >
                    {loading ? "Menyimpan..." : "Simpan"}
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

export default CreateEmployee;
