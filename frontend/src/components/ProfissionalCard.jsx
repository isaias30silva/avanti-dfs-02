export default function ProfissionalCard({ pessoa }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
      <h3 className="text-xl font-semibold">{pessoa.nome}</h3>
      <p className="text-gray-600">{pessoa.email}</p>
      <p className="mt-2 text-sm">{pessoa.descricao}</p>
    </div>
  );
}