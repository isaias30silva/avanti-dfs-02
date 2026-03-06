export const ObjetivoSection = () => {
  return (
    <section id="objetivo" className="py-24 px-6 bg-white text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#13225E]">
          Nosso Objetivo
        </h2>
        <p className="max-w-3xl mx-auto mb-16 text-xl text-[#524f4f] leading-relaxed">
          Democratizar o acesso ao conhecimento, conectando pessoas de diversas
          áreas e promovendo um crescimento profissional contínuo e
          colaborativo.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
              alt="Trabalho em equipe"
              className="w-full h-80 object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
              alt="Mentoria online"
              className="w-full h-80 object-cover hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
