export default function Navbar() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-xl font-bold text-blue-600">
          LOGO
        </div>

        {/* Menu */}
        <ul className="flex gap-8 items-center">
          <li>
            <a href="/" className="hover:text-blue-600">Início</a>
          </li>
          <li>
            <a href="#profissionais" className="hover:text-blue-600">Profissionais</a>
          </li>
          <li>
            <a href="#objetivo" className="hover:text-blue-600">Nosso Objetivo</a>
          </li>
          <li>
            <a href="#depoimentos" className="hover:text-blue-600">Depoimentos</a>
          </li>

          {/* Avatar */}
          <li>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </li>
        </ul>
      </nav>
    </header>
  );
}