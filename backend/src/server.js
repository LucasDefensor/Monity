import { app } from './app.js'
import cors from '@fastify/cors'

await app.register(cors, {
  origin: ['https://gmonity.netlify.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});