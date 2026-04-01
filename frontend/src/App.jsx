import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import Layout from "./components/layout/Layout";
import SimpleLayout from "./components/layout/SimpleLayout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Gastos from "./pages/gastos/Gastos";


// deixar fora do App
function PrivateRoute({ isAuth }) {
  return isAuth ? <Layout><Outlet /></Layout> : <Navigate to="/login" />;
}

function App() {
  const [isAuth, setIsAuth] = useState(() => {
    return localStorage.getItem("auth") === "true";
  });

  useEffect(() => {
    localStorage.setItem("auth", isAuth);
  }, [isAuth]);

  return (
    <Routes>

      {/* PÚBLICAS (header simples) */}
      <Route element={<SimpleLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Route>

      {/* PROTEGIDAS */}
      <Route element={<PrivateRoute isAuth={isAuth} />}>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gastos" element={<Gastos />} />

      </Route>

    </Routes>
  );
}

export default App;