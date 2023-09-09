import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'crypto'

export async function mealsRoutes(server: FastifyInstance) {
  server.post('/', async (request, reply) => {
    const createMealBodySchema = z.object({
      userId: z.string().uuid(), // temporário -> usar sessionId do request.cookies no futuro
      name: z.string(),
      description: z.string(),
      isDiet: z.boolean(),
    })

    const { userId, name, description, isDiet } = createMealBodySchema.parse(
      request.body,
    )

    await knex('meals').insert({
      id: randomUUID(),
      user_id: userId,
      name,
      description,
      is_diet: isDiet,
    })

    return reply.status(201).send()
  })
}
