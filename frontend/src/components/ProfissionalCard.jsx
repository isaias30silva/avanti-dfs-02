export const ProfissionalCard = ({ pessoa }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center border border-[#F0EBEB] flex flex-col items-center">
      <img
        src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${pessoa.nome.replace(/\s+/g, "")}`}
        alt={pessoa.nome}
        className="w-24 h-24 bg-[#F0EBEB] rounded-full mb-4 object-cover"
      />
      <h3
        className="text-xl font-bold text-[#13225E] w-full truncate"
        title={pessoa.nome}
      >
        {pessoa.nome}
      </h3>
      <p
        className="text-[#0162B3] font-semibold text-sm w-full truncate"
        title={pessoa.email}
      >
        {pessoa.email}
      </p>
      <p className="mt-4 text-sm text-[#524f4f] line-clamp-3">
        {pessoa.descricao}
      </p>
    </div>
  );
};
