import { useState, useEffect } from "react";
import { api } from "../services/api";

export const Pessoas = () => {
  const [pessoas, setPessoas] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const response = await api.get("/pessoas");
        const apenasMentores = response.data.filter(
          (p) => p.buscando === "professor",
        );
        setPessoas(apenasMentores);
      } catch (error) {
        console.error(error);
      }
    }
    carregar();
  }, []);

  const pessoasFiltradas = pessoas.filter((pessoa) => {
    const termo = busca.toLowerCase();
    return (
      pessoa.nome.toLowerCase().includes(termo) ||
      (pessoa.descricao && pessoa.descricao.toLowerCase().includes(termo))
    );
  });

  return (
    <>
      <div className="w-full min-h-[calc(100vh-80px)] flex flex-col lg:flex-row m-0 p-0">
        <div className="w-full lg:w-4/12 bg-linear-to-br from-[#13225E] to-[#0162B3] flex flex-col justify-center p-8 md:p-16 relative shadow-2xl z-10 lg:min-h-full">
          <div className="w-full text-center lg:text-left">
            <h1 className="text-[28px] md:text-[40px] font-extrabold mb-4 drop-shadow-lg text-white tracking-tighter">
              Profissionais
            </h1>
            <p className="text-[16px] md:text-[24px] text-[#2092D3] font-light leading-relaxed">
              Nossa rede de talentos. Descubra mentores prontos para ensinar
              você.
            </p>
            <div className="w-16 h-1.5 bg-[#FFD84F] mt-8 rounded-full mx-auto lg:mx-0"></div>
          </div>
        </div>

        <div className="w-full lg:w-8/12 bg-[#F8F9FA] p-6 md:p-16 overflow-y-auto lg:max-h-[calc(100vh-80px)]">
          <div className="w-full max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#E5E7EB] pb-6 mb-8 gap-4">
              <h2 className="text-[26px] md:text-[32px] font-extrabold text-[#13225E] tracking-tight">
                Mentores Cadastrados
              </h2>
              <span className="bg-[#E5E7EB] text-[#524f4f] font-bold px-4 py-1.5 rounded-full text-[14px] whitespace-nowrap">
                {pessoasFiltradas.length} Encontrados
              </span>
            </div>
            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm mb-10 flex flex-col md:flex-row gap-4 border border-[#E5E7EB]">
              <input
                type="text"
                placeholder="Buscar por nome ou descrição..."
                className="flex-1 bg-[#F8F9FA] border border-[#E5E7EB] p-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0162B3] text-[14px]"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            {pessoasFiltradas.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm">
                <p className="text-[#524f4f] text-[18px] font-light mb-4">
                  Nenhum mentor encontrado na rede.
                </p>
                {busca && (
                  <button
                    onClick={() => setBusca("")}
                    className="text-[#0162B3] text-[16px] font-bold hover:underline"
                  >
                    Limpar Filtros
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {pessoasFiltradas.map((pessoa) => (
                  <div
                    key={pessoa.id}
                    className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-[#E5E7EB] flex flex-col sm:flex-row items-center sm:items-start gap-6 group"
                  >
                    <img
                      src={
                        pessoa.fotoUrl ||
                        `https://api.dicebear.com/9.x/avataaars/svg?seed=${pessoa.nome.replace(/\s+/g, "")}`
                      }
                      alt={pessoa.nome}
                      className="w-24 h-24 bg-[#F0EBEB] rounded-full object-cover border-4 border-white shadow-sm group-hover:scale-105 transition-transform shrink-0"
                    />
                    <div className="flex-1 text-center sm:text-left w-full">
                      <h3 className="text-[24px] font-bold text-[#13225E] mb-1">
                        {pessoa.nome}
                      </h3>
                      <p className="text-[#0162B3] font-medium text-[14px] mb-3">
                        {pessoa.email}
                      </p>
                      <p className="text-[14px] text-[#524f4f] font-light line-clamp-2 leading-relaxed">
                        {pessoa.descricao ||
                          "Este mentor ainda não adicionou uma descrição ao perfil."}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span className="bg-[#F0EBEB] text-[#524f4f] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider text-[12px] whitespace-nowrap">
                        MENTOR
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};