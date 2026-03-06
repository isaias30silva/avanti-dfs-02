import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const Conhecimentos = () => {
  const [ofertas, setOfertas] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [nivelFiltro, setNivelFiltro] = useState("");
  const [ofertaSelecionada, setOfertaSelecionada] = useState(null);
  const navigate = useNavigate();

  const currentUserId = localStorage.getItem("skillmatch_user_id");
  const userRole = localStorage.getItem("skillmatch_user_role");

  useEffect(() => {
    api
      .get("/conhecimentos")
      .then((response) => setOfertas(response.data))
      .catch((error) => console.error(error));
  }, []);

  const excluirOferta = async (id) => {
    if (
      window.confirm(
        "Tem certeza que deseja excluir permanentemente esta oferta?",
      )
    ) {
      try {
        await api.delete(`/conhecimentos/${id}`);
        const res = await api.get("/conhecimentos");
        setOfertas(res.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const entrarEmContato = () => {
    if (!ofertaSelecionada || !ofertaSelecionada.pessoa) return;

    const nomeMentor = ofertaSelecionada.pessoa.nome;
    const tituloOferta = ofertaSelecionada.titulo;
    const telefoneLimpo = String(
      ofertaSelecionada.pessoa.telefone || "",
    ).replace(/\D/g, "");

    const mensagem = encodeURIComponent(
      `Olá ${nomeMentor}, vi sua oferta de conhecimento "${tituloOferta}" no SkillMatch e gostaria de conversar sobre!`,
    );

    window.open(`https://wa.me/55${telefoneLimpo}?text=${mensagem}`, "_blank");
  };

  const categorias = [
    "Tech",
    "Music",
    "Design",
    "Languages",
    "Business",
    "Marketing",
  ];
  const niveis = ["Básico", "Intermediário", "Avançado", "Especialista"];

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
    <>
      <div className="w-full flex-1 flex flex-col bg-[#F8F9FA]">
        <div className="w-full bg-white border-b border-[#E5E7EB] py-10 px-4 shadow-sm">
          <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h1 className="tracking-tight mb-2">Hub de Conhecimento</h1>
              <p className="text-[16px] md:text-[20px] text-[#524f4f] font-light">
                Encontre as habilidades para alavancar sua carreira.
              </p>
            </div>

            {userRole === "professor" && (
              <button
                onClick={() => navigate("/conhecimentos/novo")}
                className="bg-[#0162B3] text-white font-bold text-[14px] md:text-[16px] px-8 py-3.5 rounded-xl hover:bg-[#13225E] transition-all shadow-md w-full md:w-auto"
              >
                + Nova Oferta
              </button>
            )}
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 py-10 animate-slide-in">
          <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm mb-10 flex flex-col md:flex-row gap-4 border border-[#E5E7EB]">
            <input
              type="text"
              placeholder="Digite palavras-chave..."
              className="flex-1 bg-[#F8F9FA] border border-[#E5E7EB] p-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0162B3] text-[14px]"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
            <select
              className="bg-[#F8F9FA] border border-[#E5E7EB] p-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0162B3] md:w-48 text-[14px]"
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
            >
              <option value="">Categorias</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              className="bg-[#F8F9FA] border border-[#E5E7EB] p-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0162B3] md:w-48 text-[14px]"
              value={nivelFiltro}
              onChange={(e) => setNivelFiltro(e.target.value)}
            >
              <option value="">Níveis</option>
              {niveis.map((niv) => (
                <option key={niv} value={niv}>
                  {niv}
                </option>
              ))}
            </select>
          </div>

          {ofertasFiltradas.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#E5E7EB]">
              <p className="text-[#524f4f] text-[18px] font-light mb-4">
                Nenhuma oferta encontrada.
              </p>
              <button
                onClick={() => {
                  setBusca("");
                  setCategoriaFiltro("");
                  setNivelFiltro("");
                }}
                className="text-[#0162B3] text-[16px] font-bold hover:underline"
              >
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ofertasFiltradas.map((oferta) => (
                <div
                  key={oferta.id}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-[#E5E7EB] flex flex-col justify-between hover:shadow-md transition-all group"
                >
                  <div
                    className="cursor-pointer grow"
                    onClick={() => setOfertaSelecionada(oferta)}
                  >
                    <div className="flex gap-2 mb-4">
                      <span className="bg-[#2092D3] bg-opacity-10 text-[#FFFFFF] font-bold text-[10px] px-3 py-1 rounded-full uppercase">
                        {oferta.categoria}
                      </span>
                      <span className="bg-[#524f4f] bg-opacity-10 text-[#FFFFFF] font-bold text-[10px] px-3 py-1 rounded-full uppercase">
                        {oferta.nivel}
                      </span>
                    </div>
                    <h3 className="text-[20px] font-bold text-[#13225E] mb-3 line-clamp-2">
                      {oferta.titulo}
                    </h3>
                    <p className="text-[#524f4f] text-[14px] leading-relaxed line-clamp-3 font-light mb-2">
                      {oferta.descricao}
                    </p>
                  </div>

                  {oferta.pessoa_id === currentUserId && (
                    <div className="flex gap-3 mt-6 pt-5 border-t border-[#F3F4F6]">
                      <button
                        onClick={() =>
                          navigate(`/conhecimentos/editar/${oferta.id}`)
                        }
                        className="flex-1 bg-[#F3F4F6] text-[#13225E] py-2.5 rounded-lg hover:bg-[#FFD84F] font-bold text-[12px]"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => excluirOferta(oferta.id)}
                        className="flex-1 bg-[#F3F4F6] text-[#F13232] py-2.5 rounded-lg hover:bg-[#F13232] hover:text-white font-bold text-[12px]"
                      >
                        Excluir
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {ofertaSelecionada && (
        <div className="fixed inset-0 bg-[#13225E] bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-slide-in">
          <div className="bg-white p-6 md:p-10 rounded-2xl max-w-2xl w-full relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setOfertaSelecionada(null)}
              className="absolute top-4 right-4 text-[#524f4f] hover:text-[#F13232] font-bold text-[24px] bg-[#F3F4F6] w-10 h-10 rounded-full flex items-center justify-center"
            >
              &times;
            </button>
            <div className="flex gap-2 mb-6 border-b border-[#E5E7EB] pb-4 pr-12">
              <span className="bg-[#2092D3] bg-opacity-10 text-[#FFFFFF] font-bold text-[12px] px-4 py-1.5 rounded-full uppercase">
                {ofertaSelecionada.categoria}
              </span>
              <span className="bg-[#524f4f] bg-opacity-10 text-[#FFFFFF] font-bold text-[12px] px-4 py-1.5 rounded-full uppercase">
                {ofertaSelecionada.nivel}
              </span>
            </div>
            <h2 className="leading-tight mb-6">{ofertaSelecionada.titulo}</h2>
            <div className="bg-[#F8F9FA] p-6 rounded-xl border border-[#E5E7EB] mb-6">
              <h4 className="text-[#0162B3] font-bold mb-3 uppercase tracking-wider text-[12px]">
                Detalhes da Oferta
              </h4>
              <p className="text-[#2E2E2E] text-[14px] md:text-[16px] leading-relaxed whitespace-pre-wrap font-light">
                {ofertaSelecionada.descricao}
              </p>
            </div>
            {ofertaSelecionada.pessoa && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-t border-[#E5E7EB] pt-6">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      ofertaSelecionada.pessoa.fotoUrl ||
                      `https://api.dicebear.com/9.x/avataaars/svg?seed=${ofertaSelecionada.pessoa.nome}`
                    }
                    alt="Mentor"
                    className="w-14 h-14 rounded-full border-2 border-[#F0EBEB]"
                  />
                  <div>
                    <p className="text-[10px] text-[#524f4f] uppercase font-bold tracking-widest">
                      Ofertado por
                    </p>
                    <p className="text-[18px] font-bold text-[#13225E]">
                      {ofertaSelecionada.pessoa.nome}
                    </p>
                  </div>
                </div>
                <button
                  onClick={entrarEmContato}
                  className="sm:ml-auto w-full sm:w-auto bg-[#4BB002] text-white px-6 py-3 rounded-xl font-bold text-[14px] hover:bg-[#3da002] transition-all shadow-md active:scale-95"
                >
                  Entrar em contato
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
