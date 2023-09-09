// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

declare module 'knex/modules/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      email: string
    }
    meals: {
      id: string
      user_id: string
      name: string
      description: string
      is_diet: boolean
      created_at: Date
    }
  }
}
