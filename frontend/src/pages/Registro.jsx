import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const Registro = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    senha: "",
    buscando: "estudante",
  });

  const navigate = useNavigate();

  const formatCPF = (value) => {
    let v = value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return v;
  };

  const formatPhone = (value) => {
    let v = value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    return v;
  };

  const handleChange = (e) => {
    let { id, value } = e.target;

    if (id === "cpf") {
      value = formatCPF(value);
    } else if (id === "telefone") {
      value = formatPhone(value);
    }

    setForm({ ...form, [id]: value });
  };

  const registrar = async (e) => {
    e.preventDefault();
    try {
      await api.post("/pessoas", form);
      alert("Cadastro realizado com sucesso! Faça seu login.");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.error || "Erro ao realizar o cadastro.");
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
              O aprendizado ao
              <br />
              alcance de <span className="text-[#00a8ff]">todos.</span>
            </h2>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="group bg-transparent border-none cursor-pointer text-[#f5f5f5] font-semibold text-[18px] transition-opacity duration-300 hover:opacity-80 flex items-center gap-1"
            >
              <span className="group-hover:underline">Já tenho conta</span>{" "}
              &rarr;
            </button>
          </div>

          <div className="text-[#f5f5f5] text-[14px] font-medium leading-normal">
            Aprenda <span className="text-[#59b244]">sem limites</span>. Ensine
            com
            <br />
            <span className="text-[#59b244]">propósito</span>. Tudo em uma só
            <br />
            plataforma.
          </div>
        </div>

        <div className="bg-[#00a8ff] w-full max-w-105 h-auto md:h-160 rounded-[40px] p-7.5 shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex items-center shrink-0">
          <div className="bg-[#fcfcfc] w-full h-full rounded-[30px] px-7.5 py-6 flex flex-col justify-center">
            <form onSubmit={registrar} className="flex flex-col gap-2.5">
              <div className="flex flex-col gap-1 text-left">
                <label
                  htmlFor="nome"
                  className="text-[13px] text-[#333333] font-medium"
                >
                  Nome Completo*
                </label>
                <input
                  type="text"
                  id="nome"
                  placeholder="Seu nome"
                  value={form.nome}
                  onChange={handleChange}
                  required
                  className="px-3.5 py-2.5 border border-[#e0e0e0] rounded-md text-[13px] outline-none transition-colors duration-300 text-[#333333] bg-white w-full focus:border-[#00a8ff] placeholder:text-[#cfcfcf]"
                />
              </div>

              <div className="flex flex-col gap-1 text-left">
                <label
                  htmlFor="email"
                  className="text-[13px] text-[#333333] font-medium"
                >
                  E-mail*
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="px-3.5 py-2.5 border border-[#e0e0e0] rounded-md text-[13px] outline-none transition-colors duration-300 text-[#333333] bg-white w-full focus:border-[#00a8ff] placeholder:text-[#cfcfcf]"
                />
              </div>

              <div className="flex flex-col gap-1 text-left">
                <label
                  htmlFor="cpf"
                  className="text-[13px] text-[#333333] font-medium"
                >
                  CPF*
                </label>
                <input
                  type="text"
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={form.cpf}
                  onChange={handleChange}
                  required
                  className="px-3.5 py-2.5 border border-[#e0e0e0] rounded-md text-[13px] outline-none transition-colors duration-300 text-[#333333] bg-white w-full focus:border-[#00a8ff] placeholder:text-[#cfcfcf]"
                />
              </div>

              <div className="flex flex-col gap-1 text-left">
                <label
                  htmlFor="telefone"
                  className="text-[13px] text-[#333333] font-medium"
                >
                  Telefone*
                </label>
                <input
                  type="text"
                  id="telefone"
                  placeholder="(00) 00000-0000"
                  value={form.telefone}
                  onChange={handleChange}
                  required
                  className="px-3.5 py-2.5 border border-[#e0e0e0] rounded-md text-[13px] outline-none transition-colors duration-300 text-[#333333] bg-white w-full focus:border-[#00a8ff] placeholder:text-[#cfcfcf]"
                />
              </div>

              <div className="flex flex-col gap-1 text-left">
                <label
                  htmlFor="senha"
                  className="text-[13px] text-[#333333] font-medium"
                >
                  Senha*
                </label>
                <input
                  type="password"
                  id="senha"
                  placeholder="********"
                  value={form.senha}
                  onChange={handleChange}
                  required
                  className="px-3.5 py-2.5 border border-[#e0e0e0] rounded-md text-[13px] outline-none transition-colors duration-300 text-[#333333] bg-white w-full focus:border-[#00a8ff] placeholder:text-[#cfcfcf]"
                />
              </div>

              <div className="flex flex-col gap-1 text-left">
                <label
                  htmlFor="buscando"
                  className="text-[13px] text-[#333333] font-medium"
                >
                  O que está buscando?
                </label>
                <select
                  id="buscando"
                  value={form.buscando}
                  onChange={handleChange}
                  required
                  className="px-3.5 py-2.5 border border-[#e0e0e0] rounded-md text-[13px] outline-none transition-colors duration-300 text-[#333333] bg-white w-full focus:border-[#00a8ff] cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-size-[14px_14px] bg-position-[right_15px_center] bg-no-repeat pr-7.5"
                >
                  <option value="estudante">Sou estudante</option>
                  <option value="professor">Sou professor</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-2 bg-[#000000] text-[#ffffff] border-none py-3 px-4 rounded-[25px] text-[15px] font-semibold cursor-pointer transition-colors duration-300 w-full hover:bg-[#222222]"
              >
                Registrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
