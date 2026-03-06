import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";

export default function Profile() {

  const { id } = useParams();

  const [pessoa, setPessoa] = useState(null);
  const [conhecimentos, setConhecimentos] = useState([]);

  const navigate = useNavigate();

  const [modalExcluirPessoa, setModalExcluirPessoa] = useState(false);

  const [modalExcluirConhecimento, setModalExcluirConhecimento] = useState(false);
    const [conhecimentoSelecionado, setConhecimentoSelecionado] = useState(null);

  const [toast, setToast] = useState(null);

  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    descricao: "",
    });

    function gerarIniciais(nome) {
    const partes = nome.split(" ");
    const iniciais =
    partes[0][0] + (partes.length > 1 ? partes[partes.length - 1][0] : "");
    return iniciais.toUpperCase();
}

    function handleChange(e) {
    const { name, value } = e.target;

    if (name === "telefone") {
    let v = value.replace(/\D/g, "");

    if (v.length > 11) v = v.slice(0, 11);

    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");

    setForm({ ...form, telefone: v });
    return;
  }

  setForm({ ...form, [name]: value });
}

async function carregarDados() {
  const pessoaResponse = await api.get(`/pessoas/${id}`);
  const conhecimentosResponse = await api.get("/conhecimentos");

  const conhecimentosPessoa = conhecimentosResponse.data.filter(
    (c) => c.pessoa_id === id
  );

  setPessoa(pessoaResponse.data);
  setConhecimentos(conhecimentosPessoa);

  setForm({
    nome: pessoaResponse.data.nome || "",
    email: pessoaResponse.data.email || "",
    telefone: pessoaResponse.data.telefone || "",
    descricao: pessoaResponse.data.descricao || "",
  });
}

  useEffect(() => {
    carregarDados();
  }, []);

  async function excluirPessoa() {
    if (!confirm("Deseja excluir este usuário?")) return;

    await api.delete(`/pessoas/${id}`);

    alert("Usuário excluído");
  }

  async function excluirConhecimento(conhecimentoId) {
    if (!confirm("Deseja excluir este conhecimento?")) return;

    await api.delete(`/conhecimentos/${conhecimentoId}`);

    carregarDados();
  }

async function confirmarExclusaoPessoa() {

  try {

    await api.delete(`/pessoas/${id}`);

    setToast({
      message: "Usuário removido com sucesso!",
      type: "delete"
    });

    setModalExcluirPessoa(false);

    setTimeout(() => {
      navigate("/");
    }, 1200);

  } catch {

    setToast({
      message: "Erro ao excluir usuário",
      type: "error"
    });

  }
}

async function atualizarPessoa() {
  try {

    await api.put(`/pessoas/${id}`, form);

    setToast({
      message: "Atualização realizada com sucesso!",
      type: "update",
    });

    setEditando(false);

    carregarDados();

  } catch (err) {

    setToast({
      message: "Erro ao atualizar usuário",
      type: "error",
    });

  }
}

async function confirmarExclusaoConhecimento() {
  try {

    await api.delete(`/conhecimentos/${conhecimentoSelecionado}`);

    setToast({
      message: "Conhecimento removido com sucesso!",
      type: "delete",
    });

    setModalExcluirConhecimento(false);

    carregarDados();

  } catch {

    setToast({
      message: "Erro ao excluir conhecimento",
      type: "error",
    });

  }
}

  if (!pessoa) return <p>Carregando...</p>;

 return (
  <>
  <div className="min-h-screen bg-blue-100 flex justify-center p-10">

    <div className="w-full max-w-6xl grid grid-cols-3 gap-10">

      <div className="bg-white shadow-lg rounded-xl p-8 text-center h-fit">

        <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
          {gerarIniciais(pessoa.nome)}
      </div>

        <h2 className="text-2xl font-bold text-gray-800">
          {pessoa.nome}
        </h2>

        <p className="text-gray-500 mt-2">
        </p>

      </div>

      <div className="col-span-2 space-y-8">

        <div className="bg-white shadow-lg rounded-xl p-8">

          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            Dados do Cadastro
          </h3>

          {editando ? (
            <div className="space-y-4">

              <input
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Nome"
                className="w-full border p-3 rounded-lg"
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border p-3 rounded-lg"
              />

              <input
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                placeholder="Telefone"
                className="w-full border p-3 rounded-lg"
              />

              <textarea
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
                placeholder="Descrição"
                className="w-full border p-3 rounded-lg"
              />

            </div>

          ) : (

            <div className="space-y-2 text-gray-700">
              <p><b>Email:</b> {pessoa.email}</p>
              <p><b>Telefone:</b> {pessoa.telefone}</p>
              <p><b>Descrição:</b> {pessoa.descricao}</p>
            </div>

          )}

          <div className="mt-6 flex gap-4">

            {editando ? (
              <>
                <button
                  onClick={atualizarPessoa}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
                >
                  Salvar
                </button>

                <button
                  onClick={() => setEditando(false)}
                  className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEditando(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
                >
                  Editar
                </button>

                <button
                  onClick={() => setModalExcluirPessoa(true)}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
                >
                  Excluir
                </button>
              </>
            )}

          </div>

        </div>

        {/* Conhecimentos */}
        <div className="bg-white shadow-lg rounded-xl p-8">

          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            Conhecimentos
          </h3>

          <button
          onClick={() => navigate(`/conhecimentos/${id}`)}
          className="mb-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            + Adicionar Novo Conhecimento
          </button>

          <div className="space-y-4">

            {conhecimentos.map((c) => (

              <div
                key={c.id}
                className="border p-4 rounded-lg flex justify-between items-center hover:shadow-md transition"
              >

                <div>
                  <p className="font-semibold text-lg">{c.titulo}</p>
                  <p className="text-gray-500 text-sm">{c.categoria}</p>
                  <p className="text-gray-500 text-sm">{c.nivel}</p>
                </div>

                <div className="flex gap-2">

                  <button
                  onClick={() => navigate(`/conhecimento-editar/${c.id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:opacity-90"
                  >
                  Editar
                  </button>

                  <button
                    onClick={() => {
                    setConhecimentoSelecionado(c.id);
                    setModalExcluirConhecimento(true);
                  }}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                  >
                    Excluir
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  </div>

  {modalExcluirPessoa && (
    <ConfirmModal
      message="Deseja realmente excluir este usuário?"
      onConfirm={confirmarExclusaoPessoa}
      onCancel={() => setModalExcluirPessoa(false)}
    />
  )}

  {modalExcluirConhecimento && (
  <ConfirmModal
    message="Deseja realmente excluir este conhecimento?"
    onConfirm={confirmarExclusaoConhecimento}
    onCancel={() => setModalExcluirConhecimento(false)}
  />
)}

  {toast && (
    <Toast
      message={toast.message}
      type={toast.type}
      onClose={() => setToast(null)}
    />
  )}

</>
);
}

