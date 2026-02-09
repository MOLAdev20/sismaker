import { Link } from "react-router-dom";
import { useMemo } from "react";

export default function NotFound() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between border-b border-slate-200 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-900" />
            <div>
              <div className="text-sm font-semibold tracking-wide">
                SISMAKER
              </div>
              <div className="text-xs text-slate-500">
                Sistem Manajemen Pekerja
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-500">{year}</div>
        </header>

        <main className="flex flex-1">
          <div className="w-full">
            <div className="gap-8">
              <section className="rounded-2xl p-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  404 PAGE NOT FOUND
                </div>
                <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">
                  Halaman tidak ditemukan
                </h1>
                <p className="mt-3 text-sm text-slate-600">
                  Halaman yang kamu cari sudah dipindahkan, dihapus, atau belum
                  tersedia. Coba kembali ke dashboard atau gunakan menu
                  navigasi.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/dashboard"
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                  >
                    Kembali ke Data Karyawan
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
