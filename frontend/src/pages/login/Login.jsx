import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setIsAuth }) {
  const navigate = useNavigate();

  function handleLogin() {
    setIsAuth(true);
    navigate("/dashboard");
  }

  return (
    <div className="main-container">

      <div className="container">
          <h1>Em breve...</h1>
          <p>Acesso nao exige login em prototipo.</p>
      </div>

      <div className="login-wrapper">

        <div className="container login-box">

          <h2>Entrar</h2>

          <div className="col">
            <input placeholder="Email" />
            <input placeholder="Senha" type="password" />
          </div>

          <button onClick={handleLogin}>
            Acessar Dashboard
          </button>

        </div>

      </div>
    </div>
  );
}

export default Login;