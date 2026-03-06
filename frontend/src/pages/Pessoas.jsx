import { useState } from "react";
import api from "../services/api";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpg";

export default function Pessoas() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    descricao: "",
  });

  const navigate = useNavigate();

  const [idCriado, setIdCriado] = useState(null);
  const [toast, setToast] = useState(null);

  function irParaConhecimentos() {
  navigate(`/conhecimentos/${idCriado}`);
  }

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

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:opacity-90 transition"
          >
          Registrar
          </button>

          {idCriado && (
            <div className="mt-6 text-center space-y-4">

              <p className="text-gray-600">
                Agora que você realizou seu cadastro, já pode cadastrar qual conhecimento deseja compartilhar!
              </p>

          <button
            type="button"
            onClick={irParaConhecimentos}
            className="bg-purple-600 text-white px-6 py-3 rounded cursor-pointer hover:opacity-90 transition"
          >
            Cadastrar Conhecimento
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