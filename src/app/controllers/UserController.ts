import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'

import { UserRepository } from '../repositories/UserRepository'
import { AppError } from '../errors/AppError'

export class UserController {
  async store(req: Request, resp: Response) {
    const { name = '', email = '' } = req.body

    const userRepository = getCustomRepository(UserRepository)

    if (!name || !email) {
      const field = !name ? 'name' : 'email'
      throw new AppError(`Field ${field} can't be blank!`)
    }

    const isValidEmail = email.includes('@') && email.includes('.com')

    if (!isValidEmail) {
      throw new AppError('Email has invalid format!')
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
      throw new AppError('Email has already been taken!')
    }

    await userRepository.save(user)

    return resp.status(201).json(user)
  }
}
