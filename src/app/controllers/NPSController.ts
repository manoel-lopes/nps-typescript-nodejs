import { Request, Response } from 'express'
import { getCustomRepository, Not, IsNull } from 'typeorm'

import { SurveyUserRepository } from '../repositories/SurveyUserRepository'

export class NPSController {
  async exec(req: Request, resp: Response) {

    const { survey_id } = req.params

    const surveyUserRepository = getCustomRepository(SurveyUserRepository)

    const surveysUser = await surveyUserRepository.find({ 
      survey_id,
      value: Not(IsNull())
    })

    const detractors = surveysUser.filter(
      ({ value }) => value >= 0 && value <= 6 
    ).length

    const passives = surveysUser.filter(
      ({ value }) => value >= 7 && value <= 8 
    ).length

    const promoters = surveysUser.filter(
      ({ value }) => value >= 9 && value <= 10 
    ).length

    const totalAnswers = surveysUser.length

    const calculation = 100 * ((promoters - detractors) / totalAnswers)

    return resp.json({
      detractors,
      passives,
      promoters,
      totalAnswers,
      nps: calculation
    })
  }
}
