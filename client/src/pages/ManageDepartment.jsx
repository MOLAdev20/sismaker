import Layout from "../AdminLayout";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageDepartment = () => {
  useEffect(() => {
    document.title = "Input Karyawan - SISMAKER";
  }, []);

  return (
    <Layout pageTitle={"manage-department"}>
      <main className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold">Data Departemen & Posisi</h1>
            <p className="mt-1 text-sm text-slate-600">
              Masukkan data departemen dan posisi sebelum menambahkan karyawan
            </p>
          </div>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4">
          {/* Main panel */}
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white">
            <div className="gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="font-semibold">Daftar Departemen</h1>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default ManageDepartment;
