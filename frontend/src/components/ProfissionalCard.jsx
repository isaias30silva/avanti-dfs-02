import { useNavigate } from "react-router-dom";

export default function ProfissionalCard({ pessoa }) {

  const navigate = useNavigate();

  function abrirPerfil() {
    navigate(`/profiles/${pessoa.id}`);
  }

function gerarIniciais(nome) {
  const partes = nome.split(" ");
  const iniciais =
    partes[0][0] + (partes.length > 1 ? partes[partes.length - 1][0] : "");
  return iniciais.toUpperCase();
}

  return (
    <div
      onClick={abrirPerfil}
      className="bg-white p-6 rounded-xl shadow-md text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition"
    >
      <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
  {gerarIniciais(pessoa.nome)}
</div>

      <h3 className="text-xl font-semibold">{pessoa.nome}</h3>

      <p className="text-gray-500 text-sm">{pessoa.email}</p>

      <p className="mt-2 text-sm text-gray-600 line-clamp-3">
        {pessoa.descricao}
      </p>

    </div>
  );
}