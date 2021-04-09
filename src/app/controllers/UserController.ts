import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import { User } from '../models/User'

class UserController {
  async store(req: Request, resp: Response) {
    const { name = '', email = '' } = req.body

    const userRepository = getRepository(User)

    // if (!name || !email) {
    //   return resp.status(400).json({ error: 'Blank field not allowed!' })
    // }

    // const isValidEmail = email.includes('@') && email.includes('.')

    // if (!isValidEmail) {
    //   return resp.status(400).json({ error: 'Invalid email!' })
    // }

    const user = userRepository.create({
      name, 
      email
    })

    // const emailAlreadyRegistered = await userRepository.findOne({
    //   where: {
    //     email
    //   }
    // })

    // if (emailAlreadyRegistered) {
    //   return resp.status(400).json({ error: 'Email already in use!' })
    // }

    await userRepository.save(user)

    return resp.json(user)
  }
}

export { UserController }
