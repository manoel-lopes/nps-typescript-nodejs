import { SendEmailController } from './app/controllers/SendEmailController'
import express from 'express'

import { UserController } from './app/controllers/UserController'
import { SurveyController } from './app/controllers/SurveyController'

const routes = express.Router()

const userController = new UserController()
const surveyController = new SurveyController()
const sendEmailController = new SendEmailController()

routes.post('/users', userController.store)

routes.post('/surveys', surveyController.store)
routes.get('/surveys', surveyController.index)

routes.post('/sendEmail', sendEmailController.exec)

export { routes }

