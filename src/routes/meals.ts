import { FastifyInstance } from 'fastify'

export async function mealsRoutes(server: FastifyInstance) {
  server.get('/', async (request, reply) => {
    return { hello: 'meals get' }
  })

  server.post('/', async (request, reply) => {
    return { hello: 'meals post' }
  })

  server.put('/:id', async (request, reply) => {
    return { hello: 'meals put' }
  })

  server.delete('/:id', async (request, reply) => {
    return { hello: 'meals delete' }
  })
}
