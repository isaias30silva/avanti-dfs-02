import { useState } from "react";
import api from "../services/api";
import Toast from "../components/Toast";

export default function Pessoas() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    descricao: "",
  });

  const [idCriado, setIdCriado] = useState(null);
  const [toast, setToast] = useState(null);

function handleChange(e) {
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
  }

  async function registrar(e) {
  e.preventDefault();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;

  if (!emailRegex.test(form.email)) {
    setToast({ message: "Email inválido.", type: "error" });
    return;
  }

  if (form.telefone && !phoneRegex.test(form.telefone)) {
    setToast({
      message: "Telefone inválido. Use o formato (xx) xxxxx-xxxx",
      type: "error",
    });
    return;
  }

  try {
    const response = await api.post("/pessoas", form);
    setIdCriado(response.data.id);

    setToast({ message: "Cadastro realizado com sucesso!", type: "success" });
  } catch (err) {
    setToast({
      message: err.response?.data?.error || "Erro no cadastro",
      type: "error",
    });
  }
}

  async function atualizar() {
    try {
      await api.put(`/pessoas/${idCriado}`, form);
      setToast({ message: "Atualização realizada com sucesso!", type: "update" });
    } catch (err) {
      alert("Erro ao atualizar");
    }
  }

  async function excluir() {
    try {
      await api.delete(`/pessoas/${idCriado}`);
      setForm({ nome: "", email: "", telefone: "", descricao: "" });
      setIdCriado(null);

      setToast({ message: "Cadastro removido com sucesso!", type: "delete" });
    } catch (err) {
      alert("Erro ao excluir");
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* Lado esquerdo */}
      <div className="w-1/2 bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
        LOGO
      </div>

      {/* Lado direito */}
      <div className="w-1/2 flex items-center justify-center p-10">
        <form onSubmit={registrar} className="w-full max-w-md space-y-4">

          <h2 className="text-2xl font-bold mb-4">Cadastro</h2>

          <input
            name="nome"
            placeholder="Nome completo *"
            className="w-full border p-3 rounded"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="E-mail *"
            className="w-full border p-3 rounded"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="telefone"
            placeholder="Telefone"
            className="w-full border p-3 rounded"
            value={form.telefone}
            onChange={handleChange}
          />

          <textarea
            name="descricao"
            placeholder="Descrição"
            className="w-full border p-3 rounded"
            value={form.descricao}
            onChange={handleChange}
          />

          <button className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:opacity-90 transition">
            Registrar
          </button>

          {idCriado && (
            <div className="flex gap-4 mt-4">
              <button
                type="button"
                onClick={atualizar}
                className="flex-1 bg-blue-600 text-white p-3 rounded cursor-pointer hover:opacity-90 transition"
              >
                Atualizar
              </button>

              <button
                type="button"
                onClick={excluir}
                className="flex-1 bg-yellow-500 text-white p-3 rounded cursor-pointer hover:opacity-90 transition"
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
}