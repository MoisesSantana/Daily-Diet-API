import { FastifyInstance } from 'fastify'

export async function usersRoutes(server: FastifyInstance) {
  server.get('/', async (request, reply) => {
    return { hello: 'user get' }
  })

  server.post('/', async (request, reply) => {
    return { hello: 'user post' }
  })

  server.put('/:id', async (request, reply) => {
    return { hello: 'user put' }
  })

  server.delete('/:id', async (request, reply) => {
    return { hello: 'user delete' }
  })
}
