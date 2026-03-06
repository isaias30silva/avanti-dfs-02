import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { Toast } from "../components/Toast";

export const Pessoas = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    descricao: "",
  });
  const [idCriado, setIdCriado] = useState(null);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "telefone") {
      let v = value.replace(/\D/g, "");
      if (v.length > 11) v = v.slice(0, 11);
      v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
      v = v.replace(/(\d{5})(\d)/, "$1-$2");
      setForm({ ...form, telefone: v });
      return;
    }
    setForm({ ...form, [name]: value });
  };

  const registrar = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      setToast({ message: "Email inválido.", type: "error" });
      return;
    }

    try {
      const response = await api.post("/pessoas", form);
      setIdCriado(response.data.id);
      setToast({ message: "Cadastro realizado com sucesso!", type: "success" });
    } catch (error) {
      console.error(error);
      setToast({
        message: error.response?.data?.error || "Erro no cadastro",
        type: "error",
      });
    }
  };

  const atualizar = async () => {
    try {
      await api.put(`/pessoas/${idCriado}`, form);
      setToast({
        message: "Atualização realizada com sucesso!",
        type: "update",
      });
    } catch (error) {
      console.error(error);
      setToast({ message: "Erro ao atualizar", type: "error" });
    }
  };

  const excluir = async () => {
    try {
      await api.delete(`/pessoas/${idCriado}`);
      setForm({ nome: "", email: "", telefone: "", descricao: "" });
      setIdCriado(null);
      setToast({ message: "Cadastro removido com sucesso!", type: "delete" });
    } catch (error) {
      console.error(error);
      setToast({ message: "Erro ao excluir", type: "error" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <div className="md:w-5/12 bg-linear-to-b from-[#13225E] to-[#0162B3] flex flex-col items-center justify-center text-white p-12 relative shadow-2xl z-10">
        <button
          onClick={() => navigate("/")}
          className="absolute top-10 left-10 text-white/80 font-bold hover:text-[#FFD84F] transition-colors flex items-center gap-2"
        >
          <span>&larr;</span> Voltar ao Início
        </button>
        <div className="text-center">
          <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">
            SkillMatch
          </h1>
          <p className="text-2xl text-[#2092D3] font-light max-w-sm mx-auto">
            Faça parte da nossa rede de talentos e conecte-se com o futuro.
          </p>
        </div>
      </div>

      <div className="md:w-7/12 flex items-center justify-center p-8 lg:p-20 bg-[#F8F9FA]">
        <form
          onSubmit={registrar}
          className="w-full max-w-lg flex flex-col gap-6 bg-white p-10 rounded-3xl shadow-xl border border-[#E5E7EB]"
        >
          <div className="mb-4">
            <h2 className="text-4xl font-extrabold text-[#13225E] mb-2">
              Crie seu Perfil
            </h2>
            <p className="text-[#524f4f]">
              Preencha os dados abaixo para se cadastrar.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#13225E] ml-1">
              Nome Completo *
            </label>
            <input
              name="nome"
              placeholder="Digite seu nome"
              className="w-full bg-[#F3F4F6] border-none p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0162B3] transition-all"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#13225E] ml-1">
              E-mail *
            </label>
            <input
              name="email"
              type="email"
              placeholder="seu@email.com"
              className="w-full bg-[#F3F4F6] border-none p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0162B3] transition-all"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#13225E] ml-1">
              Telefone
            </label>
            <input
              name="telefone"
              placeholder="(00) 00000-0000"
              className="w-full bg-[#F3F4F6] border-none p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0162B3] transition-all"
              value={form.telefone}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-[#13225E] ml-1">
              Suas Habilidades
            </label>
            <textarea
              name="descricao"
              placeholder="Conte um pouco sobre o que você faz..."
              className="w-full bg-[#F3F4F6] border-none p-4 rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#0162B3] transition-all"
              value={form.descricao}
              onChange={handleChange}
            />
          </div>

          <button className="bg-[#4BB002] text-white font-bold text-xl px-4 py-5 rounded-xl hover:bg-[#3da002] transition-all shadow-md mt-4">
            {idCriado ? "Perfil Registrado" : "Registrar Perfil"}
          </button>

          {idCriado && (
            <div className="flex gap-4 mt-2">
              <button
                type="button"
                onClick={atualizar}
                className="flex-1 bg-[#0162B3] text-white font-bold py-4 rounded-xl hover:bg-[#13225E] transition-all shadow-md"
              >
                Atualizar
              </button>
              <button
                type="button"
                onClick={excluir}
                className="flex-1 bg-white text-[#F13232] border-2 border-[#F13232] font-bold py-4 rounded-xl hover:bg-[#F13232] hover:text-white transition-all shadow-md"
              >
                Excluir
              </button>
            </div>
          )}
        </form>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};
