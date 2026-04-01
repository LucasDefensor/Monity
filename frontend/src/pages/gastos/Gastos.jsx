import { useState } from "react";
import "./Gastos.css";
import { useGastos } from "../../hooks/useGastos";

function Gastos() {
  const [filtroMes, setFiltroMes] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");

  const [openForm, setOpenForm] = useState(false);
  const [editando, setEditando] = useState(null);

  const [form, setForm] = useState({
    descricao: "",
    valor: "",
    categoria: "",
  });

  const { gastos, adicionarGasto, removerGasto, editarGasto } = useGastos();

  const lista = Array.isArray(gastos) ? gastos : [];

  // filtro
  const gastosFiltrados = lista.filter((g) => {
    const data = g?.created_at ? new Date(g.created_at) : null;

    const matchMes =
      filtroMes && data
        ? data.getMonth() + 1 === Number(filtroMes)
        : true;

    const matchCategoria = filtroCategoria
      ? g?.categoria?.toLowerCase().includes(filtroCategoria.toLowerCase())
      : true;

    return matchMes && matchCategoria;
  });

  // 🔹 métricas
  const total = gastosFiltrados.reduce((acc, g) => {
    return acc + Number(g?.valor || 0);
  }, 0);

  // abrir novo
  function handleNovo() {
    setEditando(null);
    setForm({
      descricao: "",
      valor: "",
      categoria: "",
    });
    setOpenForm(true);
  }

  // editar
  function handleEditar(g) {
    setEditando(g);
    setForm({
      descricao: g.descricao,
      valor: g.valor,
      categoria: g.categoria,
    });
    setOpenForm(true);
  }

  // salvar
  async function handleSalvar() {
    if (!form.descricao || !form.valor || isNaN(form.valor)) {
      alert("Dados inválidos");
      return;
    }

    if (editando) {
      await editarGasto(editando.id, {
        descricao: form.descricao,
        valor: Number(form.valor),
        categoria: form.categoria,
      });
    } else {
      await adicionarGasto({
        descricao: form.descricao,
        valor: Number(form.valor),
        categoria: form.categoria,
      });
    }

    setOpenForm(false);
  }

  return (
    <div className="container">

      {/* HEADER */}
      <div className="gastos-header">
        <h2>Gastos</h2>
        <button className="btn-add" onClick={handleNovo}>
          + Novo Gasto
        </button>
      </div>

      {/* FILTROS */}
      <div className="gastos-filtros">
        <select onChange={(e) => setFiltroMes(e.target.value)}>
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

        <input
          type="text"
          placeholder="Categoria"
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
        />
      </div>

      {/* MÉTRICAS */}
      <div className="gastos-metricas">
        <div className="card">
          <span>Total</span>
          <strong>
            R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </strong>
        </div>

        <div className="card">
          <span>Quantidade</span>
          <strong>{gastosFiltrados.length}</strong>
        </div>
      </div>

      {/* TABELA */}
      <table className="gastos-tabela">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {gastosFiltrados.map((g) => (
            <tr key={g.id}>
              <td>{g.descricao}</td>
              <td>{g.categoria}</td>
              <td>
                R$ {Number(g.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </td>
              <td>
                {new Date(g.created_at).toLocaleDateString("pt-BR")}
              </td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => handleEditar(g)}
                >
                  Editar
                </button>

                <button
                  className="btn-delete"
                  onClick={() => removerGasto(g.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* DRAWER */}
      {openForm && (
        <div className="container">

          <div className="form-header">
            <h3>{editando ? "Editar Gasto" : "Novo Gasto"}</h3>
            <button onClick={() => setOpenForm(false)}>✕</button>
          </div>

          <div className="form-body">
            <input
              placeholder="Descrição"
              value={form.descricao}
              onChange={(e) =>
                setForm({ ...form, descricao: e.target.value })
              }
            />

            <input
              placeholder="Valor"
              value={form.valor}
              onChange={(e) =>
                setForm({ ...form, valor: e.target.value })
              }
            />

            <input
              placeholder="Categoria"
              value={form.categoria}
              onChange={(e) =>
                setForm({ ...form, categoria: e.target.value })
              }
            />
          </div>

          <div className="form-footer">
            <button onClick={() => setOpenForm(false)}>Cancelar</button>
            <button className="btn-add" onClick={handleSalvar}>
              Salvar
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default Gastos;