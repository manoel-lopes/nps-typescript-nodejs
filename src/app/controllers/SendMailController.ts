import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { resolve } from 'path'

import { UserRepository } from '../repositories/UserRepository'
import { SurveyRepository } from '../repositories/SurveyRepository'
import { SurveyUserRepository } from '../repositories/SurveyUserRepository'
import { AppError } from '../errors/AppError'
import SendMailService from '../services/SendMailService'

export class SendMailController {

  async exec(req: Request, resp: Response) {
    const { email, survey_id } = req.body

    const userRepository = getCustomRepository(UserRepository)
    const surveyRepository = getCustomRepository(SurveyRepository)
    const surveyUserRepository = getCustomRepository(SurveyUserRepository)

    const user = await userRepository.findOne({ email })

    if (!user) {
      throw new AppError('User not found!', 404)
    }

    const survey = await surveyRepository.findOne({ id: survey_id })

    if (!survey) {
      throw new AppError('Survey not found!', 404)
    }

    const mailVariables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: '',
      link: 'http://localhost:3333/answers'
    }

    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')
    
    const surveyUserAlreadyRegistered = await surveyUserRepository.findOne({
      where: { user_id: user.id, value: null },
      relations: ['user', 'survey']
    })

    if (surveyUserAlreadyRegistered) {
      mailVariables.id = surveyUserAlreadyRegistered.id
      await SendMailService.exec(email, survey.title, mailVariables, npsPath)
      return resp.send(surveyUserAlreadyRegistered)
    }
    
    const surveyUser = surveyUserRepository.create({
      user_id: user.id,
      survey_id
    })
    
    mailVariables.id = surveyUser.id

    await surveyUserRepository.save(surveyUser)
    
    await SendMailService.exec(email, survey.title, mailVariables, npsPath)
    
    return resp.status(201).send(surveyUser)
  }
}

