import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pessoas from "./pages/Pessoas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pessoas" element={<Pessoas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;