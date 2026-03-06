import { useEffect, useState } from "react";
import api from "../services/api";
import ProfissionalCard from "./ProfissionalCard";

export default function ProfissionaisSection() {

  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    async function carregar() {
      const response = await api.get("/pessoas");

      const ordenadas = [...response.data].reverse();

      setPessoas(ordenadas);
    }

    carregar();
  }, []);

  const principais = pessoas.slice(0, 6);

  const outros = pessoas.slice(6);

  return (
    <section id="profissionais" className="py-20 px-6 bg-gray-50">

      <h2 className="text-3xl font-bold text-center mb-10">
        Profissionais
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">

        {principais.map((p) => (
          <ProfissionalCard key={p.id} pessoa={p} />
        ))}

      </div>

      {outros.length > 0 && (

        <div className="max-w-6xl mx-auto">

          <h3 className="text-xl font-semibold mb-4">
            Outros profissionais
          </h3>

          <div className="flex gap-6 overflow-x-auto pb-4">

            {outros.map((p) => (

              <div key={p.id} className="min-w-[250px]">

                <ProfissionalCard pessoa={p} />

              </div>

            ))}

          </div>

        </div>

      )}

    </section>
  );
}