function Cards({ gastos, gastosFiltrados }) {

  function somar(lista) {
    return lista.reduce((acc, g) => acc + Number(g?.valor ?? 0), 0);
  }

  function getTopCategoria(lista) {
    if (!lista.length) return null;

    const categorias = {};

    lista.forEach((g) => {
      if (!g?.categoria) return;

      categorias[g.categoria] =
        (categorias[g.categoria] || 0) + Number(g?.valor ?? 0);
    });

    const ordenado = Object.entries(categorias).sort(
      (a, b) => b[1] - a[1]
    );

    return ordenado[0];
  }

  const total = somar(gastos); // 🔥 total geral
  const totalMes = somar(gastosFiltrados); // 🔥 baseado no filtro
  const topCategoria = getTopCategoria(gastosFiltrados); // 🔥 só do mês

  function formatar(valor) {
    return Number(valor || 0).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
  }

  return (
    <div style={{ display: "flex", gap: 10 }}>
      <div>
        <i className="fa-solid fa-hand-holding-dollar"></i>{" "}
        Total: R$ {formatar(total)}
      </div>

      <div>
        <i className="fa-solid fa-calendar"></i>{" "}
        Mês: R$ {formatar(totalMes)}
      </div>

      <div>
        <i className="fa-solid fa-folder"></i>{" "}
        Categoria: {topCategoria ? topCategoria[0] : "-"}
      </div>
    </div>
  );
}

export default Cards;