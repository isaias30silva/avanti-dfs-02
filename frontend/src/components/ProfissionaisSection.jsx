import { useEffect, useState } from "react";
import { api } from "../services/api";
import { ProfissionalCard } from "./ProfissionalCard";

export const ProfissionaisSection = () => {
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    async function carregar() {
      try {
        const response = await api.get("/pessoas");
        setPessoas(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    carregar();
  }, []);

  const ultimosProfissionais = pessoas.slice(-3);

  return (
    <section id="profissionais" className="py-20 px-6 bg-[#F0EBEB]">
      <h2 className="text-4xl font-bold text-center mb-12 text-[#13225E]">
        Novos Profissionais
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {ultimosProfissionais.map((p) => (
          <ProfissionalCard key={p.id} pessoa={p} />
        ))}
      </div>
    </section>
  );
};
