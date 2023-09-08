import 'dotenv/config'
import { app } from './app'
console.log(process.env)
const PORT = Number(process.env.PORT) || 3333

app
  .listen({
    host: '0.0.0.0',
    port: PORT,
  })
  .then(() => {
    console.log('HTTP Server Running! 🚀')
  })
