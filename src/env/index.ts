import 'dotenv/config'
import { config } from 'dotenv'
import { z } from 'zod'

config({ path: `.env.${process.env.NODE_ENV}` })

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) throw new Error('Invalid environment variables!')

export const env = _env.data