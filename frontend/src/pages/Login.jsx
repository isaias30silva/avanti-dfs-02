import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const Login = () => {
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const fazerLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", form);
      localStorage.setItem("skillmatch_user_name", response.data.nome);
      localStorage.setItem("skillmatch_user_id", response.data.id);
      localStorage.setItem(
        "skillmatch_user_photo",
        response.data.fotoUrl || "",
      );

      const userRes = await api.get(`/pessoas/${response.data.id}`);
      localStorage.setItem("skillmatch_user_role", userRes.data.buscando);

      navigate("/home");
    } catch {
      alert("E-mail ou senha incorretos.");
    }
  };

  return (
    <div className="bg-white flex justify-center items-center min-h-screen p-5 w-full">
      <div className="flex flex-col md:flex-row gap-7.5 items-center justify-center w-full max-w-200">
        <div className="bg-black w-full max-w-[320px] h-160 rounded-[40px] flex flex-col justify-between items-center px-5 pt-12.5 pb-10 shadow-[0_10px_30px_rgba(0,0,0,0.1)] text-center shrink-0">
          <div className="flex flex-col items-center justify-center w-full">
            <img
              src="/logo.png"
              alt="SkillMatch Logo"
              className="w-full max-w-62.5 h-auto block object-contain"
            />
          </div>

          <div className="flex flex-col items-center gap-10">
            <h2 className="text-[#f5f5f5] text-[24px] font-semibold leading-[1.3]">
              Bem-vindo de
              <br />
              volta à <span className="text-[#00a8ff]">SkillMatch.</span>
            </h2>
            <button
              type="button"
              onClick={() => navigate("/registro")}
              className="bg-transparent border-none cursor-pointer text-[#f5f5f5] font-semibold text-[18px] transition-opacity duration-300 hover:opacity-80"
            >
              Criar uma conta &rarr;
            </button>
          </div>

          <div className="text-[#f5f5f5] text-[14px] font-medium leading-normal">
            Acesse sua conta para continuar
            <br />
            sua jornada de <span className="text-[#59b244]">crescimento</span>.
          </div>
        </div>

        <div className="bg-[#00a8ff] w-full max-w-105 h-auto md:h-160 rounded-[40px] p-7.5 shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex items-center shrink-0">
          <div className="bg-[#fcfcfc] w-full h-full rounded-[30px] px-7.5 py-8.75 flex flex-col justify-center">
            <form onSubmit={fazerLogin} className="flex flex-col gap-4">
              <h2 className="text-[24px] font-bold text-[#00a8ff] mb-1">
                Entrar
              </h2>

              <div className="flex flex-col gap-1.5 text-left">
                <label
                  htmlFor="email"
                  className="text-[13px] text-[#333333] font-medium"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="px-3.75 py-3 border border-[#e0e0e0] rounded-md text-[13px] outline-none transition-colors duration-300 text-[#333333] bg-white w-full focus:border-[#00a8ff] placeholder:text-[#cfcfcf]"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label
                  htmlFor="senha"
                  className="text-[13px] text-[#333333] font-medium"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="senha"
                  placeholder="********"
                  value={form.senha}
                  onChange={handleChange}
                  required
                  className="px-3.75 py-3 border border-[#e0e0e0] rounded-md text-[13px] outline-none transition-colors duration-300 text-[#333333] bg-white w-full focus:border-[#00a8ff] placeholder:text-[#cfcfcf]"
                />
              </div>

              <button
                type="submit"
                className="mt-3.75 bg-[#000000] text-[#ffffff] border-none py-3.5 px-4 rounded-[25px] text-[15px] font-semibold cursor-pointer transition-colors duration-300 w-full hover:bg-[#222222]"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
