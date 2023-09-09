import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function mealsRoutes(server: FastifyInstance) {
  server.addHook('preHandler', checkSessionIdExists)

  server.post('/', async (request, reply) => {
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      isDiet: z.boolean(),
    })

    const { name, description, isDiet } = createMealBodySchema.parse(
      request.body,
    )

    const { sessionId } = request.cookies

    await knex('meals').insert({
      id: randomUUID(),
      user_id: sessionId,
      name,
      description,
      is_diet: isDiet,
    })

    return reply.status(201).send()
  })

  server.put('/:mealId', async (request, reply) => {
    const updateMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      isDiet: z.boolean(),
    })

    const { name, description, isDiet } = updateMealBodySchema.parse(
      request.body,
    )

    const { mealId } = request.params as { mealId: string }

    const { sessionId } = request.cookies

    const hasBeenUpdated = await knex('meals')
      .where({
        id: mealId,
        user_id: sessionId,
      })
      .update({
        name,
        description,
        is_diet: isDiet,
      })

    if (!hasBeenUpdated) return reply.status(404).send({ error: 'Not found' })

    return reply.status(204).send()
  })
}
