import 'reflect-metadata'
import express from 'express'
import { routes } from './routes'

import './db'

const app = express()

app.use(express.json())
app.use(routes)

export { app }
