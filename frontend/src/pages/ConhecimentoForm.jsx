import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import { Navbar } from "../components/Navbar";

export const ConhecimentoForm = () => {
  const [pessoas, setPessoas] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    categoria: "Tech",
    nivel: "Básico",
    pessoa_id: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/pessoas")
      .then((response) => {
        setPessoas(response.data);
        if (response.data.length > 0 && !id) {
          setForm((prev) =>
            prev.pessoa_id ? prev : { ...prev, pessoa_id: response.data[0].id },
          );
        }
      })
      .catch((error) => console.error(error));

    if (id) {
      api
        .get(`/conhecimentos/${id}`)
        .then((response) => setForm(response.data))
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const salvar = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/conhecimentos/${id}`, form);
      } else {
        await api.post("/conhecimentos", form);
      }
      navigate("/conhecimentos");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0EBEB] flex flex-col">
      <Navbar />
      <div className="grow flex items-center justify-center p-6">
        <form
          onSubmit={salvar}
          className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-xl flex flex-col gap-5 border border-[#e0e0e0]"
        >
          <h2 className="text-3xl font-bold text-[#13225E] mb-2">
            {id ? "Atualizar Oferta" : "Criar Nova Oferta"}
          </h2>

          <select
            name="pessoa_id"
            className="w-full border border-[#524f4f] p-4 rounded-lg bg-white focus:outline-none focus:border-[#0162B3]"
            value={form.pessoa_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o Profissional</option>
            {pessoas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>

          <input
            name="titulo"
            placeholder="Título da Oferta *"
            className="w-full border border-[#524f4f] p-4 rounded-lg focus:outline-none focus:border-[#0162B3]"
            value={form.titulo}
            onChange={handleChange}
            required
          />

          <textarea
            name="descricao"
            placeholder="Descreva detalhadamente o que você vai ensinar..."
            className="w-full border border-[#524f4f] p-4 rounded-lg h-40 resize-none focus:outline-none focus:border-[#0162B3]"
            value={form.descricao}
            onChange={handleChange}
            required
          />

          <div className="flex gap-4">
            <select
              name="categoria"
              className="w-1/2 border border-[#524f4f] p-4 rounded-lg bg-white focus:outline-none focus:border-[#0162B3]"
              value={form.categoria}
              onChange={handleChange}
            >
              <option value="Tech">Tech</option>
              <option value="Music">Music</option>
              <option value="Design">Design</option>
              <option value="Languages">Languages</option>
            </select>

            <select
              name="nivel"
              className="w-1/2 border border-[#524f4f] p-4 rounded-lg bg-white focus:outline-none focus:border-[#0162B3]"
              value={form.nivel}
              onChange={handleChange}
            >
              <option value="Básico">Básico</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={() => navigate("/conhecimentos")}
              className="flex-1 bg-[#524f4f] text-white py-4 rounded-lg font-bold hover:opacity-90 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#4BB002] text-white py-4 rounded-lg font-bold hover:opacity-90 transition"
            >
              {id ? "Salvar Alterações" : "Cadastrar Oferta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
