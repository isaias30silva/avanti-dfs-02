import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pessoas from "./pages/Pessoas";
import Conhecimentos from "./pages/Conhecimentos";
import Profile from "./pages/Profile";
import EditarConhecimento from "./pages/EditarConhecimento";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pessoas" element={<Pessoas />} />
        <Route path="/conhecimentos/:pessoaId" element={<Conhecimentos />} />
        <Route path="/profiles/:id" element={<Profile />} />
        <Route path="/conhecimento-editar/:id" element={<EditarConhecimento />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;