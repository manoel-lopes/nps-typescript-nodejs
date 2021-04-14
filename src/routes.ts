import express from 'express'

import { UserController } from './app/controllers/UserController'
import { SurveyController } from './app/controllers/SurveyController'
import { SendMailController } from './app/controllers/SendMailController'
import { AnswerController } from './app/controllers/AnswerController'
import { NPSController } from './app/controllers/NPSController'

const routes = express.Router()

const userController = new UserController()
const surveyController = new SurveyController()
const sendMailController = new SendMailController()
const answerController = new AnswerController()
const npsController = new NPSController()

routes.post('/users', userController.store)

routes.post('/surveys', surveyController.store)
routes.get('/surveys', surveyController.index)

routes.post('/sendMail', sendMailController.exec)

routes.get('/answers/:value', answerController.exec)

routes.get('/nps/:survey_id', npsController.exec)

export { routes }

