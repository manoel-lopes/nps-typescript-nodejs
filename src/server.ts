import  express from 'express'
// import routes from './routes'
// const routes = require('./routes')

// require('./db')

const app = express()
const port = 3333

// app.use(cors());
app.use(express.json())
// app.use(routes)

app.listen(
    port,
    () => console.log(`The server is running on http://localhost:${port}`))