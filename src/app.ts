import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'

import { routes } from './routes'
import createConnection from './db'
import { AppError } from './app/errors/AppError'
  
createConnection()
const app = express()

app.use(express.json())
app.use(routes)

app.use(
  (err: Error, req: Request, rep: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return rep.status(err.status).json({
        error: err.message
      })
    }
  
    return rep.status(500).json({
      error: `Internal server error ${err.message}`
    })
  }
)
  
export { app }
