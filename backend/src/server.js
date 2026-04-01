import { app } from './app.js'
import cors from '@fastify/cors'

await app.register(cors, {
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333,
})