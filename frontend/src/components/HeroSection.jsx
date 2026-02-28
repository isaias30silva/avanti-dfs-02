import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-blue-100 py-20 px-6 text-center">
      <h1 className="text-4xl font-bold mb-6">
        Conectando quem quer aprender com quem quer ensinar
      </h1>

      <p className="max-w-2xl mx-auto mb-8 text-lg">
        Nossa plataforma conecta profissionais e estudantes.
      </p>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => navigate("/pessoas")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:opacity-90 transition"
        >
          Quero Aprender
        </button>

        <button className="bg-green-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:opacity-90 transition">
          Quero Ensinar
        </button>
      </div>
    </section>
  );
}