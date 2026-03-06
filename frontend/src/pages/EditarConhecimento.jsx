import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Toast from "../components/Toast";
import logo from "../assets/images/logo.jpg";

export default function EditarConhecimento() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [toast, setToast] = useState(null);

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    categoria: "",
    nivel: "",
  });

  useEffect(() => {
    carregarConhecimento();
  }, []);

  async function carregarConhecimento() {

    const response = await api.get(`/conhecimentos/${id}`);

    setForm(response.data);

  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function atualizar(e) {

    e.preventDefault();

    try {

      await api.put(`/conhecimentos/${id}`, form);

      setToast({
        message: "Conhecimento atualizado!",
        type: "update"
      });

      setTimeout(() => {
        navigate(-1);
      }, 1500);

    } catch {

      setToast({
        message: "Erro ao atualizar conhecimento",
        type: "error"
      });

    }
  }

  return (
    <div className="min-h-screen flex">

      <div className="w-1/2 h-screen flex items-center justify-center bg-black">
        <img
          src={logo}
          alt="Logo"
          className="w-72 object-contain"
        />
      </div>

      <div className="w-1/2 flex items-center justify-center p-10">

        <form onSubmit={atualizar} className="w-full max-w-md space-y-4">

          <h2 className="text-2xl font-bold mb-4">
            Editar Conhecimento
          </h2>

          <input
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <select
            name="nivel"
            value={form.nivel}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="">Selecione</option>
            <option value="Básico">Básico</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>

          <button className="bg-green-600 text-white px-4 py-2 rounded hover:opacity-90">
            Atualizar
          </button>

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