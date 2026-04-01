function TabelaGastos({ gastos, onDelete, onEdit }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Categoria</th>
          <th>Pessoa</th>
          <th>Data</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {gastos.map(g => (
          <tr key={g.id}>
            <td>{g.descricao}</td>
            <td>R$ {g.valor}</td>
            <td>{g.categoria}</td>
            <td>{g.pessoa}</td>
            <td>{g.created_at}</td>
            <td>
              <button onClick={() => onEdit(g.id)}><i class="fa-solid fa-pen-to-square"></i></button>
              <button onClick={() => onDelete(g.id)}><i class="fa-solid fa-x"></i></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TabelaGastos;