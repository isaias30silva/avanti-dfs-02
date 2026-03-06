import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Registro } from "./pages/Registro";
import { Pessoas } from "./pages/Pessoas";
import { Conhecimentos } from "./pages/Conhecimentos";
import { ConhecimentoForm } from "./pages/ConhecimentoForm";
import { Login } from "./pages/Login";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} />{" "}
        <Route path="/pessoas" element={<Pessoas />} />
        <Route path="/conhecimentos" element={<Conhecimentos />} />
        <Route path="/conhecimentos/novo" element={<ConhecimentoForm />} />
        <Route
          path="/conhecimentos/editar/:id"
          element={<ConhecimentoForm />}
        />
      </Routes>
    </BrowserRouter>
  );
};
