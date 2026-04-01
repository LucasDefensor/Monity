import { useState } from "react";
import { Link } from "react-router-dom";
import "./layout.css";
import { Outlet } from "react-router-dom";

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(prev => !prev);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="layout">

      {/* HEADER */}
      <header className="header">
        <h1 className="logo">
          Monity /<span>/ Empresa</span>
        </h1>

        <button className="menu-btn" onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
        </button>
      </header>

      {/* CONTEÚDO */}
      <main className="content">
        <Outlet />
      </main>

      {/* OVERLAY */}
      <div
        className={`overlay ${menuOpen ? "open" : ""}`}
        onClick={closeMenu}
      />

      {/* DRAWER */}
      <aside className={`drawer ${menuOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h3>Menu</h3>
          <button onClick={closeMenu}>✕</button>
        </div>

        <nav className="drawer-nav">

          <Link to="/dashboard" onClick={closeMenu}>
            <div className="nav-item">Dashboard</div>
          </Link>

          <Link to="/gastos" onClick={closeMenu}>
            <div className="nav-item">Gastos</div>
          </Link>

        </nav>
      </aside>

    </div>
  );
}

export default Layout;