import 'dotenv/config'
import { app } from './app'

const PORT = Number(process.env.PORT) || 3333

app
  .listen({
    host: '0.0.0.0',
    port: PORT,
  })
  .then(() => {
    console.log('HTTP Server Running! 🚀')
  })
