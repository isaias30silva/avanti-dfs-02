import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const Registro = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    senha: "",
    buscando: "estudante",
  });

  const navigate = useNavigate();

  const formatCPF = (value) => {
    let v = value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return v;
  };

  const formatPhone = (value) => {
    let v = value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    return v;
  };

  const handleChange = (e) => {
    let { id, value } = e.target;

    if (id === "cpf") {
      value = formatCPF(value);
    } else if (id === "telefone") {
      value = formatPhone(value);
    }

    setForm({ ...form, [id]: value });
  };

  const registrar = async (e) => {
    e.preventDefault();
    try {
      await api.post("/pessoas", form);
      alert("Cadastro realizado com sucesso! Faça seu login.");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.error || "Erro ao realizar o cadastro.");
    }
  };

  return (
    <div className="container">
      <div className="left-panel">
        <div className="header">
          <img src="/logo.png" alt="SkillMatch Logo" className="logo-img" />
        </div>

        <div className="main-content">
          <h2>
            O aprendizado ao
            <br />
            alcance de <span className="highlight-blue">todos.</span>
          </h2>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="group subscribe-link bg-transparent border-none cursor-pointer text-white font-bold text-lg transition-colors"
          >
            <span className="group-hover:underline">Já tenho conta</span> &rarr;
          </button>
        </div>

        <div className="footer-text">
          Aprenda <span className="highlight-green">sem limites</span>. Ensine
          com
          <br />
          <span className="highlight-green">propósito</span>. Tudo em uma só
          <br />
          plataforma.
        </div>
      </div>

      <div className="right-panel-outer" style={{ height: "740px" }}>
        <div className="right-panel-inner">
          <form onSubmit={registrar}>
            <div className="input-group">
              <label htmlFor="nome">Nome Completo*</label>
              <input
                type="text"
                id="nome"
                placeholder="Seu nome"
                value={form.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">E-mail*</label>
              <input
                type="email"
                id="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="cpf">CPF*</label>
              <input
                type="text"
                id="cpf"
                placeholder="000.000.000-00"
                value={form.cpf}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="telefone">Telefone*</label>
              <input
                type="text"
                id="telefone"
                placeholder="(00) 00000-0000"
                value={form.telefone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="senha">Senha*</label>
              <input
                type="password"
                id="senha"
                placeholder="********"
                value={form.senha}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="buscando">O que está buscando?</label>
              <select
                id="buscando"
                value={form.buscando}
                onChange={handleChange}
                required
              >
                <option value="estudante">Sou estudante</option>
                <option value="professor">Sou professor</option>
              </select>
            </div>

            <button type="submit" className="submit-btn mt-2">
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
