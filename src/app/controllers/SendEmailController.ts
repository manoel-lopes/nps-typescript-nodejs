import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import { UserRepository } from '../repositories/UserRepository'
import { SurveyRepository } from '../repositories/SurveyRepository'
import { SurveyUserRepository } from '../repositories/SurveyUserRepository'

export class SendEmailController {
    
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

    const surveyUser = surveyUserRepository.create({
      user_id: user.id,
      survey_id
    })

    await surveyUserRepository.save(surveyUser)

    return resp.status(201).send(surveyUser)
  }
}
    
