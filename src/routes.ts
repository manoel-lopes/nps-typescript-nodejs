import express from 'express'

import { UserController } from './app/controllers/UserController'

const routes = express.Router()

const userController = new UserController()

routes.post('/users', userController.store)

export { routes }
