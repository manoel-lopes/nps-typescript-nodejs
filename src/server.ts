import { app } from './app'

const port = 3333

app.listen(
  port,
  () => console.log(`The server is running on http://localhost:${port}`))
