import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpg";

export default function Conhecimentos() {

const [categoriaCustom, setCategoriaCustom] = useState(false);

  const { pessoaId } = useParams();

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    categoria: "",
    nivel: "",
  });

  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function registrar(e) {
  e.preventDefault();

  try {
    await api.post("/conhecimentos", {
      ...form,
      pessoa_id: pessoaId,
    });

    setToast({
      message: "Conhecimento cadastrado com sucesso!",
      type: "success",
    });

    setTimeout(() => {
      navigate("/");
    }, 1500);

  } catch (err) {
    setToast({
      message: err.response?.data?.error || "Erro ao cadastrar conhecimento",
      type: "error",
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

        <form onSubmit={registrar} className="w-full max-w-md space-y-4">

          <h2 className="text-2xl font-bold mb-4">
            Cadastrar Conhecimento
          </h2>

          <input
            name="titulo"
            placeholder="Título do conhecimento *"
            className="w-full border p-3 rounded"
            value={form.titulo}
            onChange={handleChange}
            required
          />

          <textarea
            name="descricao"
            placeholder="Descrição"
            className="w-full border p-3 rounded"
            value={form.descricao}
            onChange={handleChange}
          />

          <select
            name="categoria"
            className="w-full border p-3 rounded"
            value={form.categoria}
            onChange={(e) => {
            const value = e.target.value;

            if (value === "Outro") {
            setCategoriaCustom(true);
            setForm({ ...form, categoria: "" });
            } else {
            setCategoriaCustom(false);
            setForm({ ...form, categoria: value });
          }
        }}
        >
  <option value="">Selecione uma categoria</option>
  <option value="Tecnologia">Tecnologia</option>
  <option value="Artesanato">Artesanato</option>
  <option value="Esporte">Esporte</option>
  <option value="Idiomas">Idiomas</option>
  <option value="Música">Música</option>
  <option value="Culinária">Culinária</option>
  <option value="Educação">Educação</option>
  <option value="Design">Design</option>
  <option value="Marketing">Marketing</option>
  <option value="Fotografia">Fotografia</option>
  <option value="Finanças">Finanças</option>
  <option value="Saúde">Saúde</option>
  <option value="Outro">Outro</option>
</select>

{categoriaCustom && (
  <input
    name="categoria"
    placeholder="Digite a categoria"
    className="w-full border p-3 rounded"
    value={form.categoria}
    onChange={handleChange}
  />
)}

          <select
  name="nivel"
  className="w-full border p-3 rounded"
  value={form.nivel}
  onChange={handleChange}
>
  <option value="">Selecione o nível</option>
  <option value="Básico">Básico</option>
  <option value="Intermediário">Intermediário</option>
  <option value="Avançado">Avançado</option>
</select>

          <button className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:opacity-90 transition">
            Registrar Conhecimento
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