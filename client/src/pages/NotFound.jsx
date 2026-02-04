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
              <div className="text-sm font-semibold tracking-wide">SISMAKER</div>
              <div className="text-xs text-slate-500">Sistem Manajemen Pekerja</div>
            </div>
          </div>
          <div className="text-xs text-slate-500">{year}</div>
        </header>

        <main className="flex flex-1 items-center">
          <div className="w-full">
            <div className="grid gap-8 lg:grid-cols-2">
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Error 404
                </div>
                <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">
                  Halaman tidak ditemukan
                </h1>
                <p className="mt-3 text-sm text-slate-600">
                  Halaman yang kamu cari sudah dipindahkan, dihapus, atau belum
                  tersedia. Coba kembali ke dashboard atau gunakan menu navigasi.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/dashboard"
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                  >
                    Kembali ke Dashboard
                  </Link>
                  <Link
                    to="/"
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-slate-50"
                  >
                    Ke Beranda
                  </Link>
                </div>
              </section>

              <section className="grid gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="text-sm font-semibold">Apa yang bisa kamu lakukan?</div>
                  <ul className="mt-4 space-y-3 text-sm text-slate-600">
                    <li className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-slate-300" />
                      Pastikan URL sesuai format yang tersedia.
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-slate-300" />
                      Gunakan fitur pencarian di dashboard untuk menemukan data.
                    </li>
                    <li className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-slate-300" />
                      Hubungi admin jika kamu butuh akses tambahan.
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="text-sm font-semibold">Status layanan</div>
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    Semua sistem berjalan normal.
                  </div>
                  <div className="mt-3 text-xs text-slate-500">
                    Terakhir dicek 2 menit yang lalu.
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
