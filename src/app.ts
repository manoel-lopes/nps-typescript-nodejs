import 'reflect-metadata'
import express from 'express'
import { routes } from './routes'

import createConnection from './db'
  
require('dotenv').config({
  path: process.env.NODE_ENV?.match('test') ? '.env.test' : '.env'
})

createConnection()
const app = express()

app.use(express.json())
app.use(routes)

export { app }
