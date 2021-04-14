import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { resolve } from 'path'

import { UserRepository } from '../repositories/UserRepository'
import { SurveyRepository } from '../repositories/SurveyRepository'
import { SurveyUserRepository } from '../repositories/SurveyUserRepository'
import SendMailService from '../services/SendMailService'

export class SendMailController {

  async exec(req: Request, resp: Response) {
    const { email, survey_id } = req.body

    const userRepository = getCustomRepository(UserRepository)
    const surveyRepository = getCustomRepository(SurveyRepository)
    const surveyUserRepository = getCustomRepository(SurveyUserRepository)

    const user = await userRepository.findOne({ email })

    if (!user) {
      return resp.json(404).json({ error: 'User not found!' })
    }

    const survey = await surveyRepository.findOne({ id: survey_id })

    if (!survey) {
      return resp.json(404).json({ error: 'Survey not found!' })
    }

    const mailVariables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      user_id: user.id,
      link: 'http://localhost:3333/answers'
    }

    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')
    
    const surveyUserAlreadyRegistered = await surveyUserRepository.findOne({
      where: { user_id: user.id, value: null },
      relations: ['user', 'survey']
    })

    if (surveyUserAlreadyRegistered) {
      await SendMailService.exec(email, survey.title, mailVariables, npsPath)
      return resp.send(surveyUserAlreadyRegistered)
    }

    const surveyUser = surveyUserRepository.create({
      user_id: user.id,
      survey_id
    })

    await surveyUserRepository.save(surveyUser)

    await SendMailService.exec(email, survey.title, mailVariables, npsPath)

    return resp.status(201).send(surveyUser)
  }
}

