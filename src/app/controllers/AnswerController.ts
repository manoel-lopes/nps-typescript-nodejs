import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import { SurveyUserRepository } from './../repositories/SurveyUserRepository'
import { AppError } from '../errors/AppError'

export class AnswerController {
  async exec(req: Request, resp: Response) {
    const { value } = req.params
    const { u } = req.query

    const surveyUserRepository = getCustomRepository(SurveyUserRepository)

    const surveyUser = await surveyUserRepository.findOne({
      id: String(u)
    })

    if (!surveyUser) {
      throw new AppError('Survey user not found!', 404)
    }

    surveyUser.value = Number(value)

    await surveyUserRepository.save(surveyUser)

    return resp.json(surveyUser)
  }
}
