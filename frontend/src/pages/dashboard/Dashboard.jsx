import { useState } from "react";
import "./Dashboard.css";

import { useGastos } from "../../hooks/useGastos";
import Grafico from "../../components/Grafico";
import Cards from "../../components/Card";
import "../../styles/containers.css";

function Dashboard() {
  const { gastos } = useGastos();

  const [anoSelecionado, setAnoSelecionado] = useState(
    new Date().getFullYear()
  );
  const [mesSelecionado, setMesSelecionado] = useState("");

  // 🔹 anos únicos
  const anosDisponiveis = [
    ...new Set(
      (gastos || [])
        .map(g => g?.created_at && new Date(g.created_at).getFullYear())
        .filter(Boolean)
    )
  ];

  // 🔹 filtro base (ano)
  let filtrados = (gastos || []).filter(g => {
    if (!g?.created_at) return false;
    return new Date(g.created_at).getFullYear() === Number(anoSelecionado);
  });

  // 🔹 filtro adicional (mês)
  if (mesSelecionado) {
    filtrados = filtrados.filter(g => {
      return new Date(g.created_at).getMonth() + 1 === Number(mesSelecionado);
    });
  }

  return (
    <div className="main-container col">

      {/* HEADER */}
      <div className="row">
        <div className="container" style={{ flex: 1 }}>
          <h1>Dashboard</h1>
        </div>

        <div className="container">
          <select
            value={anoSelecionado}
            onChange={(e) => setAnoSelecionado(e.target.value)}
          >
            {anosDisponiveis.map((ano) => (
              <option key={ano} value={ano}>
                {ano}
              </option>
            ))}
          </select>

          <select
            value={mesSelecionado}
            onChange={(e) => setMesSelecionado(e.target.value)}
          >
            <option value="">Todos os meses</option>
            <option value="1">Jan</option>
            <option value="2">Fev</option>
            <option value="3">Mar</option>
            <option value="4">Abr</option>
            <option value="5">Mai</option>
            <option value="6">Jun</option>
            <option value="7">Jul</option>
            <option value="8">Ago</option>
            <option value="9">Set</option>
            <option value="10">Out</option>
            <option value="11">Nov</option>
            <option value="12">Dez</option>
          </select>
        </div>
      </div>

      {/* CARDS */}
      <div className="container">
        <Cards gastos={gastos} gastosFiltrados={filtrados} />
      </div>

      {/* GRÁFICOS */}
      <div className="grid-2">
        <div className="container">
          <Grafico tipo="pizza" gastos={filtrados} />
        </div>

        <div className="container">
          <Grafico
            tipo="barra"
            gastos={filtrados}
            mesSelecionado={mesSelecionado}
          />
        </div>
      </div>

    </div>
  );
}

export default Dashboard;