import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-linear-to-br from-[#13225E] via-[#0162B3] to-[#13225E] py-16 md:py-24 px-4 text-center text-white shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="gridPattern"
              patternUnits="userSpaceOnUse"
              width="40"
              height="40"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
        </svg>
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        <span className="inline-block bg-[#13225E] bg-opacity-20 text-[#FFD84F] font-bold text-[12px] md:text-[14px] px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest border border-[#2092D3]/30">
          A maior rede colaborativa do Brasil
        </span>
        <h1 className="text-[28px] md:text-[40px] font-extrabold mb-6 leading-[1.2] drop-shadow-xl tracking-tight">
          Conectando quem quer{" "}
          <span className="text-[#FFD84F] underline decoration-[#FFD84F]/40 underline-offset-4">
            aprender
          </span>
          <br className="hidden md:block" /> com quem quer{" "}
          <span className="text-[#4BB002] underline decoration-[#4BB002]/40 underline-offset-4">
            ensinar
          </span>
        </h1>
        <p className="mb-10 text-[16px] md:text-[24px] text-[#F0EBEB] font-light max-w-3xl mx-auto leading-relaxed opacity-95">
          Acelere sua carreira aprendendo habilidades práticas e compartilhe o
          seu conhecimento na nossa plataforma de troca de talentos.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => navigate("/conhecimentos")}
            className="bg-[#FFD84F] text-[#13225E] font-bold text-[16px] md:text-[18px] px-8 py-3 rounded-xl hover:bg-white hover:-translate-y-1 transition-all duration-300 shadow-xl"
          >
            Quero Aprender
          </button>
          <button
            onClick={() => navigate("/conhecimentos")}
            className="bg-[#4BB002] text-white font-bold text-[16px] md:text-[18px] px-8 py-3 rounded-xl hover:bg-[#3da002] hover:-translate-y-1 transition-all duration-300 shadow-xl"
          >
            Quero Ensinar
          </button>
        </div>
      </div>
    </section>
  );
};
