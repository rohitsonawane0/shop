import { NextFunction, Request, Response } from 'express'
import prisma from '~/db'
import { catchAsync } from '~/utils/utils'
import * as bcrypt from 'bcrypt'
class AuthService {
  public addUserToDb = async (reqBody: any) => {
    const { email, password, firstName, lastName, avatar } = reqBody
    const hashedPassword = await bcrypt.hash(password, 11)
    const createdUser = await prisma.user.create({
      data: { email, password: hashedPassword, firstName, lastName, avatar }
    })
    return createdUser
  }
}

export const authService = new AuthService()
