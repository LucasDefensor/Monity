import fastify from 'fastify'
import { gastosRoutes } from './routes/gastosRoutes.js'

export const app = fastify()

app.register(gastosRoutes)