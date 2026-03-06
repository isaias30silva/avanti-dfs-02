import objetivo_1 from "../assets/images/objetivo_1.jpg";
import objetivo_2 from "../assets/images/objetivo_2.jpg";

export default function ObjetivoSection() {

  return (

    <section id="objetivo" className="py-20 px-6 text-center">

      <h2 className="text-3xl font-bold mb-6">
        Nosso Objetivo
      </h2>

      <p className="max-w-3xl mx-auto mb-10">
        Nosso objetivo é democratizar o acesso ao conhecimento,
        conectando pessoas e promovendo crescimento profissional.
      </p>

      <div className="flex justify-center gap-6">

        <img
          src={objetivo_2}
          alt="Aprendizado"
          className="w-64 h-40 object-cover rounded-lg shadow"
        />

        <img
          src={objetivo_1}
          alt="Compartilhar conhecimento"
          className="w-64 h-40 object-cover rounded-lg shadow"
        />

      </div>

    </section>

  );
}