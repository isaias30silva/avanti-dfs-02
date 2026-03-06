import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-[#F0EBEB]">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div
          className="text-2xl font-bold text-[#13225E] cursor-pointer"
          onClick={() => navigate("/")}
        >
          SkillMatch
        </div>

        <ul className="flex gap-8 items-center font-semibold text-[#524f4f]">
          <li>
            <button
              onClick={() => navigate("/")}
              className="hover:text-[#0162B3] transition"
            >
              Início
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/conhecimentos")}
              className="hover:text-[#0162B3] transition"
            >
              Ofertas
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/pessoas")}
              className="hover:text-[#0162B3] transition"
            >
              Profissionais
            </button>
          </li>
          <li>
            <div className="w-10 h-10 bg-[#2092D3] text-white flex items-center justify-center rounded-full font-bold">
              SM
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};
