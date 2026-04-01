import { sql } from '../config/db.js'

export class DatabasePostgres {

  async createGasto({ valor, descricao, categoria, empresa_id }) {
    await sql`
      INSERT INTO gastos (valor, descricao, categoria, empresa_id)
      VALUES (${valor}, ${descricao}, ${categoria}, ${empresa_id})
    `
  }

  async listGastos() {
    return await sql`SELECT * FROM gastos ORDER BY id DESC`
  }

  async updateGasto(id, { valor, descricao, categoria }) {
    await sql`
      UPDATE gastos
      SET valor = ${valor},
          descricao = ${descricao},
          categoria = ${categoria}
      WHERE id = ${id}
    `
  }

  async deleteGasto(id) {
    await sql`
      DELETE FROM gastos
      WHERE id = ${id}
    `
  }
}