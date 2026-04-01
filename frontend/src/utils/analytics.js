export function resumoGastos(gastos, mesSelecionado) {
  const agora = new Date();

  const total = gastos.reduce((acc, g) => {
    return acc + Number(g?.valor ?? 0);
  }, 0);

  const totalMes = gastos.reduce((acc, g) => {
    if (!g?.created_at) return acc;

    const data = new Date(g.created_at);

    const mesmoMes = mesSelecionado
      ? data.getMonth() + 1 === Number(mesSelecionado)
      : data.getMonth() === agora.getMonth() &&
        data.getFullYear() === agora.getFullYear();

    if (!mesmoMes) return acc;

    return acc + Number(g?.valor ?? 0);
  }, 0);

  const categorias = {};

  gastos.forEach((g) => {
    if (!g?.categoria) return;
    categorias[g.categoria] = (categorias[g.categoria] || 0) + 1;
  });

  const topCategoria = Object.entries(categorias).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return {
    total,
    totalMes,
    topCategoria,
  };
}