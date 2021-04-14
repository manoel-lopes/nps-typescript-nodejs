import express from 'express'

import { UserController } from './app/controllers/UserController'
import { SurveyController } from './app/controllers/SurveyController'
import { SendMailController } from './app/controllers/SendMailController'

const routes = express.Router()

const userController = new UserController()
const surveyController = new SurveyController()
const sendMailController = new SendMailController()

routes.post('/users', userController.store)

routes.post('/surveys', surveyController.store)
routes.get('/surveys', surveyController.index)

routes.post('/sendMail', sendMailController.exec)

export { routes }

