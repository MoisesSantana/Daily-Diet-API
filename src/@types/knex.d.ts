// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

declare module 'knex/modules/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      email: string
    }
  }
}
