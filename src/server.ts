import { app } from './app'

app
  .listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .on('listening', () => {
    console.log('Server is running')
  })
