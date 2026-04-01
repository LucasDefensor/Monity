import { Link } from "react-router-dom";
import "./Home.css";

/* Visualize, controle e reduza os gastos da sua empresa com facilidade. */

function Home() {
  return (
    <div className="container" style={{ padding: 40 }}>
      <h1>Prototipo - Sistema de Controle de Gastos</h1>
      
      <p>
        No futuro sera implementado com bot no whatsapp.
      </p>

      <Link to="/login">
        <button>Entrar no sistema</button>
      </Link>
    </div>
  );
}

export default Home;