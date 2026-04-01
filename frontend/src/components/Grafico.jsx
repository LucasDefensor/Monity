import { Pie, Bar } from "react-chartjs-2";
import "../lib/chart";

function Grafico({ gastos = [], tipo = "pizza", mesSelecionado }) {

  // 🔹 cores por categoria
  function gerarCor(categoria) {
    let hash = 0;
    for (let i = 0; i < categoria.length; i++) {
      hash = categoria.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${Math.abs(hash) % 360}, 70%, 60%)`;
  }

  // 🔹 agrupamento por categoria
  const categorias = {};

  gastos.forEach(g => {
    const cat = g?.categoria || "Sem categoria";

    if (!categorias[cat]) {
      categorias[cat] = {
        total: 0,
        cor: gerarCor(cat)
      };
    }

    categorias[cat].total += Number(g.valor) || 0;
  });

  // 🥧 PIZZA
  if (tipo === "pizza") {
    return (
      <Pie
        data={{
          labels: Object.keys(categorias),
          datasets: [
            {
              data: Object.values(categorias).map(c => c.total),
              backgroundColor: Object.values(categorias).map(c => c.cor)
            }
          ]
        }}
      />
    );
  }

  // 📊 BARRA
  if (tipo === "barra") {

    // 👉 se mês selecionado → barras por categoria (COM CORES)
    if (mesSelecionado) {
      return (
        <Bar
          data={{
            labels: Object.keys(categorias),
            datasets: [
              {
                label: "Gastos por categoria",
                data: Object.values(categorias).map(c => c.total),
                backgroundColor: Object.values(categorias).map(c => c.cor)
              }
            ]
          }}
        />
      );
    }

    // 👉 se NÃO tem mês → barras por mês
    const meses = Array(12).fill(0);

    gastos.forEach(g => {
      if (!g?.created_at) return;

      const mes = new Date(g.created_at).getMonth();
      meses[mes] += Number(g.valor) || 0;
    });

    return (
      <Bar
        data={{
          labels: [
            "Jan","Fev","Mar","Abr","Mai","Jun",
            "Jul","Ago","Set","Out","Nov","Dez"
          ],
          datasets: [
            {
              label: "Gastos por mês",
              data: meses,
              backgroundColor: "rgba(100, 150, 255, 0.6)"
            }
          ]
        }}
      />
    );
  }
}

export default Grafico;