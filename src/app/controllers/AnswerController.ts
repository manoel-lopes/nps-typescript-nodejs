import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import { SurveyUserRepository } from './../repositories/SurveyUserRepository'

export class AnswerController {
  async exec(req: Request, resp: Response) {
    const { value } = req.params
    const { u } = req.query

    const surveyUserRepository = getCustomRepository(SurveyUserRepository)

    const surveyUser = await surveyUserRepository.findOne({
      id: String(u)
    })

    if (!surveyUser) {
      return resp.status(404).json({ error: 'Survey user not found!' })
    }

    surveyUser.value = Number(value)

    await surveyUserRepository.save(surveyUser)

    return resp.json(surveyUser)
  }
}
