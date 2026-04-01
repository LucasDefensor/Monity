import { useState, /*useEffect*/ } from "react";

function FormGasto({ onAdd, gastoEditando }) {
  const [form, setForm] = useState({
    descricao: "",
    valor: "",
    categoria: "",
    pessoa: "",
    data: ""
  });

  if (gastoEditando && form.id !== gastoEditando.id) {
    setForm({
      ...gastoEditando,
      data: gastoEditando.data?.slice(0, 16)
    });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAdd({
      ...form,
      id: gastoEditando ? gastoEditando.id : crypto.randomUUID(),
      valor: parseFloat(form.valor),
      data: new Date(form.data).toISOString()
    });

    setForm({
      descricao: "",
      valor: "",
      categoria: "",
      pessoa: "",
      data: ""
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input id="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição" />
      <input id="valor" type="number" value={form.valor} onChange={handleChange} placeholder="Valor" />
      <input id="categoria" value={form.categoria} onChange={handleChange} placeholder="Categoria" />
      <input id="pessoa" value={form.pessoa} onChange={handleChange} placeholder="Pessoa" />
      <input id="data" type="datetime-local" value={form.data} onChange={handleChange} />

      <button>
        {gastoEditando ? "Salvar edição" : "Adicionar"}
      </button>
    </form>
  );
}

export default FormGasto;