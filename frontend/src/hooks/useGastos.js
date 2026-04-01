import { useEffect, useState } from "react";
import {
  getGastos,
  createGasto,
  deleteGasto,
  updateGasto,
} from "../services/gastosService";

export function useGastos() {
  const [gastos, setGastos] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 carregar do backend
  async function carregarGastos() {
    try {
      setLoading(true);
      const data = await getGastos();
      setGastos(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar gastos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarGastos();
  }, []);

  // 🔹 adicionar
  async function adicionarGasto(dados) {
    try {
      const novo = await createGasto(dados);
      setGastos((prev) => [novo, ...prev]);
    } catch (err) {
      console.error(err);
      setError("Erro ao adicionar gasto");
    }
  }

  // 🔹 remover
  async function removerGasto(id) {
    try {
      await deleteGasto(id);
      setGastos((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      console.error(err);
      setError("Erro ao remover gasto");
    }
  }

  // 🔹 atualizar
  async function editarGasto(id, dados) {
    try {
      await updateGasto(id, dados);
      setGastos((prev) =>
        prev.map((g) => (g.id === id ? { ...g, ...dados } : g))
      );
    } catch (err) {
      console.error(err);
      setError("Erro ao atualizar gasto");
    }
  }

  return {
    gastos,
    loading,
    error,
    adicionarGasto,
    removerGasto,
    editarGasto,
  };
}