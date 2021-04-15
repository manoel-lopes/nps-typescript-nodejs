import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import { UserRepository } from '../repositories/UserRepository'
import { AppError } from '../errors/AppError'

export class UserController {
  async store(req: Request, resp: Response) {
    const { name = '', email = '' } = req.body

    const userRepository = getCustomRepository(UserRepository)

    if (!name || !email) {
      throw new AppError('Blank field not allowed!')
    }

    const isValidEmail = email.includes('@') && email.includes('.com')

    if (!isValidEmail) {
      throw new AppError('Invalid email!')
    }

    const user = userRepository.create({
      name, 
      email
    })

    const emailAlreadyRegistered = await userRepository.findOne({
      where: {
        email
      }
    })

    if (emailAlreadyRegistered) {
      throw new AppError('Email already in use!')
    }

    await userRepository.save(user)

    return resp.status(201).json(user)
  }
}
