import { useEffect, useState } from "react";
import api from "../services/api";
import ProfissionalCard from "./ProfissionalCard";

export default function ProfissionaisSection() {
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    async function carregar() {
      const response = await api.get("/pessoas");
      setPessoas(response.data);
    }

    carregar();
  }, []);

  return (
    <section id="profissionais" className="py-20 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">
        Profissionais
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {pessoas.map((p) => (
          <ProfissionalCard key={p.id} pessoa={p} />
        ))}
      </div>
    </section>
  );
}