const KEY = "gastos";

export function getGastos() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveGastos(gastos) {
  localStorage.setItem(KEY, JSON.stringify(gastos));
}