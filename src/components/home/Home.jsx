import { Link } from "react-router-dom";
import "./Home.css";
function Home() {
  return (
    <div className="home">
      <h1>Clinica Dental</h1>
      <div className="container">
        <Link to="/pacientes">Pacientes</Link>
        <Link to="/odontologos">Odontologos</Link>
        <Link to="/turnos">Turnos</Link>
      </div>
    </div>
  );
}

export default Home;
