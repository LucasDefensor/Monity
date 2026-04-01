import { DatabasePostgres } from '../database/database-postgres.js'

export async function gastosRoutes(app) {
  const database = new DatabasePostgres()
  const EMPRESA_ID = process.env.EMPRESA_ID

  // Criar gasto
  app.post('/gastos', async (request, reply) => {
    let { valor, descricao, categoria } = request.body

    // Cadastrar tudo minusculo
    descricao = descricao?.toLowerCase()
    categoria = categoria?.toLowerCase()

    await database.createGasto({
      valor,
      descricao,
      categoria,
      empresa_id: EMPRESA_ID,
    })

    return reply.status(201).send()
  })

  // Listar gastos
  app.get('/gastos', async () => {
    return await database.listGastos()
  })

  // Atualizar gasto
  app.put('/gastos/:id', async (request, reply) => {
    const gastoId = request.params.id
    const { valor, descricao, categoria } = request.body

    await database.updateGasto(gastoId, {
      valor,
      descricao,
      categoria,
    })

    return reply.status(204).send()
  })

  // Deletar gasto
  app.delete('/gastos/:id', async (request, reply) => {
    const gastoId = request.params.id

    await database.deleteGasto(gastoId)

    return reply.status(204).send()
  })
}