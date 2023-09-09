import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function mealsRoutes(server: FastifyInstance) {
  server.addHook('preHandler', checkSessionIdExists)

  server.get('/', async (request, reply) => {
    const { sessionId } = request.cookies

    const meals = await knex('meals').where({ user_id: sessionId })

    return reply.send({ meals })
  })

  server.get('/:mealId', async (request, reply) => {
    const { sessionId } = request.cookies
    const { mealId } = request.params as { mealId: string }

    const meal = await knex('meals')
      .where({ user_id: sessionId, id: mealId })
      .first()

    return reply.send({ meal })
  })

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

  server.delete('/:mealId', async (request, reply) => {
    const { mealId } = request.params as { mealId: string }

    const { sessionId } = request.cookies

    const hasBeenDeleted = await knex('meals')
      .where({
        id: mealId,
        user_id: sessionId,
      })
      .del()

    if (!hasBeenDeleted) return reply.status(404).send({ error: 'Not found' })

    return reply.status(204).send()
  })
}
