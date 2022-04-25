import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pacientes from "./components/pacientes/Pacientes";
import Turnos from "./components/turnos/Turnos";
import Odontologos from "./components/odontologos/Odontologos";
import Home from "./components/home/Home";
import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route Route path="/" element={<Home />} />
          <Route Route path="/pacientes" element={<Pacientes />} />
          <Route Route path="/turnos" element={<Turnos />} />
          <Route Route path="/odontologos" element={<Odontologos />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
