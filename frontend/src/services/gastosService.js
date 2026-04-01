import { api } from "./api";

// Criar gasto
export const createGasto = async (data) => {
  const response = await api.post("/gastos", data);
  return response.data;
};

// Listar gastos
export const getGastos = async (filtros = {}) => {
  const response = await api.get("/gastos", {
    params: filtros,
  });
  return response.data;
};

// Atualizar gasto
export const updateGasto = async (id, data) => {
  await api.put(`/gastos/${id}`, data);
};

// Deletar gasto
export const deleteGasto = async (id) => {
  await api.delete(`/gastos/${id}`);
};