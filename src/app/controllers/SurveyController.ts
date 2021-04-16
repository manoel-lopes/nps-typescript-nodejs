import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import { SurveyRepository } from '../repositories/SurveyRepository'
import { AppError } from '../errors/AppError'

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
      const field = !title ? 'title' : 'description'
      throw new AppError(`Field ${field} can't be blank!`)
    }
    
    const survey = surveyRepository.create({
      title, 
      description
    })
    
    await surveyRepository.save(survey)    

    return resp.status(201).json(survey)
  }
}
    
