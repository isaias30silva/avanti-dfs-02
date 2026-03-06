import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const Login = () => {
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const fazerLogin = async (e) => {
    e.preventDefault();
    try {
      await api.post("/login", form);
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.error || "E-mail ou senha incorretos.");
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
            Bem-vindo de
            <br />
            volta à <span className="highlight-blue">SkillMatch.</span>
          </h2>
          <button
            type="button"
            onClick={() => navigate("/registro")}
            className="subscribe-link bg-transparent border-none cursor-pointer text-white font-bold text-lg hover:text-[#4BB002] transition-colors"
          >
            Criar uma conta &rarr;
          </button>
        </div>

        <div className="footer-text">
          Acesse sua conta para continuar
          <br />
          sua jornada de <span className="highlight-green">crescimento</span>.
        </div>
      </div>

      <div className="right-panel-outer" style={{ height: "480px" }}>
        <div className="right-panel-inner">
          <form onSubmit={fazerLogin}>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#13225E",
                marginBottom: "20px",
              }}
            >
              Entrar
            </h2>

            <div className="input-group">
              <label htmlFor="email">E-mail</label>
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
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                placeholder="********"
                value={form.senha}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn mt-4">
              Entrar
            </button>

            
          </form>
        </div>
      </div>
    </div>
  );
};
