import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-linear-to-br from-[#13225E] to-[#0162B3] py-28 px-6 text-center text-white shadow-inner">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-md">
          Conectando quem quer <span className="text-[#FFD84F]">aprender</span>{" "}
          com quem quer <span className="text-[#4BB002]">ensinar</span>
        </h1>
        <p className="mb-12 text-xl md:text-2xl text-[#F0EBEB] font-light max-w-3xl mx-auto">
          Acelere sua carreira e compartilhe seu conhecimento na maior
          plataforma de troca de habilidades.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button
            onClick={() => navigate("/conhecimentos")}
            className="bg-[#FFD84F] text-[#13225E] font-bold text-lg px-10 py-4 rounded-xl hover:bg-white hover:scale-105 transition-all shadow-lg"
          >
            Quero Aprender
          </button>
          <button
            onClick={() => navigate("/pessoas")}
            className="bg-[#4BB002] text-white font-bold text-lg px-10 py-4 rounded-xl hover:bg-[#3da002] hover:scale-105 transition-all shadow-lg"
          >
            Quero Ensinar
          </button>
        </div>
      </div>
    </section>
  );
};
