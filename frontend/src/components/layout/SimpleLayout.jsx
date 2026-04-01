import { Outlet } from "react-router-dom";
import "./simpleLayout.css";

function SimpleLayout() {
  return (
    <div className="simple-layout">

      {/* HEADER */}
      <header className="simple-header">
        <h1 className="logo">Monity /</h1>
      </header>

      {/* CONTEÚDO */}
      <main className="simple-content">
        <Outlet />
      </main>

    </div>
  );
}

export default SimpleLayout;