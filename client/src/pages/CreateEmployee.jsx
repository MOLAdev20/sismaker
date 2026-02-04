import Layout from "../AdminLayout";

const CreateEmployee = () => {
  return (
    <Layout>
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

        <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-1">
          {/* Main panel */}
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white">
            <div className="gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="">
                <div className="text-sm font-semibold">Form Karyawan</div>
                <div className="text-xs text-slate-500">
                  List layout + filters (template)
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-5">
                <div className="flex flex-col gap-1 col-span-1">
                  <label className="text-sm text-slate-600">ID Pegawai</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-1">
                  <label className="text-sm text-slate-600">Nama Lengkap</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-1">
                  <label className="text-sm text-slate-600">
                    Jenis Kelamin
                  </label>
                  <div className="flex gap-5">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value={"l"}
                        id="gender-l"
                      />
                      <label for="gender-l">Laki-laki</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value={"p"}
                        id="gender-p"
                      />
                      <label for="gender-p">Perempuan</label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 col-span-1">
                  <label className="text-sm text-slate-600">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    name=""
                    id=""
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-5">
                <div className="flex flex-col gap-1 col-span-1">
                  <label className="text-sm text-slate-600">Email</label>
                  <input
                    type="email"
                    name=""
                    id=""
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-1">
                  <label className="text-sm text-slate-600">Nomor HP</label>
                  <input
                    type="tel"
                    name=""
                    id=""
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-1">
                  <label className="text-sm text-slate-600">Departemen</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-1">
                  <label className="text-sm text-slate-600">Posisi</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-1">
                  <label className="text-sm text-slate-600">
                    Tanggal Bergabung
                  </label>
                  <input
                    type="date"
                    name=""
                    id=""
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-1">
                  <label className="text-sm text-slate-600">Gaji</label>
                  <input
                    type="number"
                    name=""
                    id=""
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-sm text-slate-600">Alamat</label>
                  <textarea
                    rows="3"
                    name=""
                    id=""
                    className="border p-2 text-sm rounded border-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default CreateEmployee;
