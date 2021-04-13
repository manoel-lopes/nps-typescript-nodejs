import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import { SurveyRepository } from '../repositories/SurveyRepository'

export class SurveyController {

  async index(_: Request, resp: Response) {
    const surveyRepository = getCustomRepository(SurveyRepository)
        
    const users = await surveyRepository.find()
    
    return resp.json(users)
  }
    
  async store(req: Request, resp: Response) {
    const { title = '', description = '' } = req.body
    
    const surveyRepository = getCustomRepository(SurveyRepository)
    
    if (!title || !description) {
      return resp.status(400).json({ error: 'Blank field not allowed!' })
    }
    
    const survey = surveyRepository.create({
      title, 
      description
    })
    
    await surveyRepository.save(survey)    

    return resp.status(201).json(survey)
  }
}
    
