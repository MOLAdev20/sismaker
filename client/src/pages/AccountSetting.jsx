import { useForm } from "react-hook-form";
import Layout from "../AdminLayout";
import { useEffect } from "react";

const AccountSetting = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    axios.post(`${import.meta.env.VITE_API_URL}/change-password`, data);
  };

  useEffect(() => {
    document.title = "Pengaturan Akun - SISMAKER";
  }, []);
  return (
    <Layout pageTitle={"account-settings"}>
      <main className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold">Pengaturan Akun</h1>
            <p className="mt-1 text-sm text-slate-600">
              Sesuaikan akun administrasi anda
            </p>
          </div>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4">
          {/* Main panel */}
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white">
            <div className="p-2 bg-slate-300 text-slate-600 text-sm">
              Sorry it's not ready yet. I'am working hard to ship it ASAP
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <h1 className="font-semibold">Ganti Kata Sandi</h1>
              <div className="mt-5">
                <div className="flex flex-col gap-2 mb-2">
                  <label className="text-sm" htmlFor="">
                    Kata Sandi Lama
                  </label>
                  <input
                    type="text"
                    {...register("oldPassword", { required: true })}
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2 mb-2">
                  <label className="text-sm" htmlFor="">
                    Kata Sandi Baru
                  </label>
                  <input
                    type="text"
                    {...register("newPassword", { required: true })}
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="p-2 bg-slate-900 text-white rounded w-full hover:bg-slate-800 cursor-pointer transition-all"
                >
                  {true ? "Simpan" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default AccountSetting;
