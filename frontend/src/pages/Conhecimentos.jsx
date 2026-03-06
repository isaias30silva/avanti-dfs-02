import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { Navbar } from "../components/Navbar";

export const Conhecimentos = () => {
  const [ofertas, setOfertas] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [nivelFiltro, setNivelFiltro] = useState("");
  const [ofertaSelecionada, setOfertaSelecionada] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/conhecimentos")
      .then((response) => setOfertas(response.data))
      .catch((error) => console.error(error));
  }, []);

  const excluirOferta = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta oferta?")) {
      try {
        await api.delete(`/conhecimentos/${id}`);
        const response = await api.get("/conhecimentos");
        setOfertas(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const ofertasFiltradas = ofertas.filter((oferta) => {
    const matchBusca =
      oferta.titulo?.toLowerCase().includes(busca.toLowerCase()) ||
      oferta.descricao?.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria =
      categoriaFiltro === "" || oferta.categoria === categoriaFiltro;
    const matchNivel = nivelFiltro === "" || oferta.nivel === nivelFiltro;
    return matchBusca && matchCategoria && matchNivel;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto w-full p-8 grow">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-4xl font-extrabold text-[#13225E]">
            Ofertas de Conhecimento
          </h1>
          <button
            onClick={() => navigate("/conhecimentos/novo")}
            className="bg-[#0162B3] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#13225E] transition-all shadow-md hover:shadow-lg"
          >
            + Nova Oferta
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm mb-12 flex flex-col md:flex-row gap-4 border border-[#E5E7EB]">
          <input
            type="text"
            placeholder="Buscar por palavras-chave..."
            className="flex-1 bg-[#F3F4F6] border-none p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0162B3] transition-all"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <select
            className="bg-[#F3F4F6] border-none p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0162B3] md:w-56 cursor-pointer"
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
          >
            <option value="">Todas as Categorias</option>
            <option value="Tech">Tech</option>
            <option value="Music">Music</option>
            <option value="Design">Design</option>
            <option value="Languages">Languages</option>
          </select>
          <select
            className="bg-[#F3F4F6] border-none p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0162B3] md:w-56 cursor-pointer"
            value={nivelFiltro}
            onChange={(e) => setNivelFiltro(e.target.value)}
          >
            <option value="">Todos os Níveis</option>
            <option value="Básico">Básico</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
        </div>

        {ofertasFiltradas.length === 0 ? (
          <div className="text-center py-20 text-[#524f4f] text-lg">
            Nenhuma oferta encontrada com esses filtros.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ofertasFiltradas.map((oferta) => (
              <div
                key={oferta.id}
                className="bg-white p-8 rounded-3xl shadow-sm border border-[#E5E7EB] flex flex-col justify-between hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div
                  className="cursor-pointer grow"
                  onClick={() => setOfertaSelecionada(oferta)}
                >
                  <div className="flex gap-2 mb-4">
                    <span className="bg-[#2092D3] bg-opacity-10 text-[#0162B3] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                      {oferta.categoria}
                    </span>
                    <span className="bg-[#524f4f] bg-opacity-10 text-[#2E2E2E] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                      {oferta.nivel}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#13225E] mb-3 line-clamp-2">
                    {oferta.titulo}
                  </h3>
                  <p className="text-[#524f4f] line-clamp-3">
                    {oferta.descricao}
                  </p>
                </div>

                <div className="flex gap-3 mt-8 pt-6 border-t border-[#F3F4F6]">
                  <button
                    onClick={() =>
                      navigate(`/conhecimentos/editar/${oferta.id}`)
                    }
                    className="flex-1 bg-[#F3F4F6] text-[#13225E] py-3 rounded-xl hover:bg-[#FFD84F] font-bold transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => excluirOferta(oferta.id)}
                    className="flex-1 bg-[#F3F4F6] text-[#F13232] py-3 rounded-xl hover:bg-[#F13232] hover:text-white font-bold transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {ofertaSelecionada && (
        <div className="fixed inset-0 bg-[#13225E] bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-slide">
          <div className="bg-white p-10 rounded-3xl max-w-2xl w-full relative shadow-2xl">
            <button
              onClick={() => setOfertaSelecionada(null)}
              className="absolute top-6 right-6 text-[#524f4f] hover:text-[#F13232] font-bold text-3xl transition-colors bg-[#F3F4F6] w-10 h-10 rounded-full flex items-center justify-center"
            >
              &times;
            </button>
            <div className="flex gap-3 mb-6">
              <span className="bg-[#2092D3] bg-opacity-10 text-[#0162B3] font-bold text-sm px-4 py-1.5 rounded-full uppercase">
                {ofertaSelecionada.categoria}
              </span>
              <span className="bg-[#524f4f] bg-opacity-10 text-[#2E2E2E] font-bold text-sm px-4 py-1.5 rounded-full uppercase">
                {ofertaSelecionada.nivel}
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-[#13225E] mb-8">
              {ofertaSelecionada.titulo}
            </h2>

            <div className="bg-[#F8F9FA] p-8 rounded-2xl border border-[#E5E7EB]">
              <h4 className="text-[#0162B3] font-bold mb-4 uppercase tracking-wider text-sm">
                Sobre a Oferta
              </h4>
              <p className="text-[#2E2E2E] text-lg leading-relaxed whitespace-pre-wrap">
                {ofertaSelecionada.descricao}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
