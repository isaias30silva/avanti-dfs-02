export const Contato = () => {
  return (
    <>
      <div className="w-full flex-1 bg-[#F8F9FA] flex flex-col items-center py-16 md:py-24 px-4">
        <div className="max-w-xl w-full bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-[#E5E7EB] text-center">
          <h1 className="text-[#13225E] mb-4">Fale Conosco</h1>
          <p className="text-[#524f4f] mb-10 font-light text-[16px] md:text-[18px]">
            Dúvidas, sugestões ou suporte? Nossa equipe está pronta para te
            ouvir.
          </p>

          <form className="flex flex-col gap-5 text-left">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#333]">Nome</label>
              <input
                type="text"
                className="bg-[#F3F4F6] p-3.5 rounded-xl border-none outline-none focus:ring-2 focus:ring-[#0162B3]"
                placeholder="Seu nome completo"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#333]">
                E-mail
              </label>
              <input
                type="email"
                className="bg-[#F3F4F6] p-3.5 rounded-xl border-none outline-none focus:ring-2 focus:ring-[#0162B3]"
                placeholder="seu@email.com"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#333]">
                Mensagem
              </label>
              <textarea
                className="bg-[#F3F4F6] p-3.5 rounded-xl border-none outline-none focus:ring-2 focus:ring-[#0162B3] min-h-32 resize-none"
                placeholder="Como podemos ajudar?"
              ></textarea>
            </div>
            <button
              type="button"
              className="bg-[#13225E] text-white font-bold py-4 rounded-full mt-4 hover:bg-[#0162B3] transition-colors shadow-lg"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
