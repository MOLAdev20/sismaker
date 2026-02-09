import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import IconXChircle from "../components/icons/IconXCircle";
import IconEye from "../components/icons/IconEye";
import IconEyeClose from "../components/icons/IconEyeClose";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const [inValidMessage, setInvalidMessage] = useState("");

  useEffect(() => {
    document.title = "Login - SISMAKER";
  }, []);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth`, data)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.response.data.status == "invalid-credentials") {
          setInvalidMessage("Username atau password salah");
        } else if (error.response.data.status == "internal-server-error") {
          setInvalidMessage(
            "Terjadi kesalahan disisi Server. Harap refresh browser",
          );
        }
      })
      .then(() => {
        reset();
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <h1 className="mt-4 text-xl font-semibold">Admin Login</h1>
            <p className="mt-1 text-sm text-slate-600">
              Masuk untuk mengelola data karyawan.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Username
              </label>
              <input
                type="text"
                placeholder="Masukkan username"
                {...register("username", { required: true })}
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 focus-within:ring-2 focus-within:ring-slate-200">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  {...register("password", { required: true })}
                  className="w-full text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  {showPassword ? <IconEyeClose /> : <IconEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Login
            </button>
          </form>
        </div>
        {inValidMessage && (
          <Modal
            open={true}
            title="Login Gagal!"
            onClose={() => setInvalidMessage("")}
            footer={
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setInvalidMessage("")}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Coba Lagi
                </button>
              </div>
            }
          >
            <div className="flex flex-col text-center items-center gap-2 px-10 text-slate-600">
              <IconXChircle className="h-20 w-20 text-red-500" />
              <span className="text-md">{inValidMessage}</span>
            </div>
          </Modal>
        )}
      </main>
    </div>
  );
};

export default Login;
