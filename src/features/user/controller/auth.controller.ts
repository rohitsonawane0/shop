import { User } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import prisma from '~/db'
import { JWT_SECRET } from '~/globals/contants/global.varable'
import { HTTPS_STATUS } from '~/globals/contants/http'
import { BadRequestException, UnauthorizedException } from '~/globals/middlewares/error.middleware'
import { authService } from '~/service/db/auth.service'
import { catchAsync } from '~/utils/utils'
import { TokenInput } from '../interface/token.interface'
import * as bcrypt from 'bcrypt'
// console.log(JWT_SECRET)
class AuthController {
  public registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const isEmailAlreadyUsed = await this.isEmailFound(req.body.email)
    if (isEmailAlreadyUsed) {
      throw new BadRequestException('Email is already being used')
    }
    const createdUser: User = await authService.addUserToDb(req.body)
    const dataToShow = {
      email: createdUser.email,
      id: createdUser?.id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      avatar: createdUser.avatar,
      role: createdUser.role
    }
    const token = this.jwtSign(dataToShow, '1D')
    res.status(HTTPS_STATUS.CREATED).json({
      message: 'User successfully created',
      token,
      data: dataToShow
    })
  })

  public login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    const emailFound = await this.isEmailFound(email)
    if (!emailFound) {
      throw new BadRequestException('Invalid crediantials')
    }

    const oldHashedPassword = emailFound.password
    const isPasswordMatched = await bcrypt.compare(password, oldHashedPassword)

    if (!isPasswordMatched) {
      throw new BadRequestException('Invalid crediantials')
    }
    const dataToShow = {
      email: emailFound.email,
      id: emailFound?.id,
      firstName: emailFound.firstName,
      lastName: emailFound.lastName,
      avatar: emailFound.avatar,
      role: emailFound.role
    }
    const token = this.jwtSign(dataToShow, '1D')
    res.status(HTTPS_STATUS.OK).json({ message: 'Login successfully', token, data: dataToShow })
  })

  public jwtSign(payload: TokenInput, expiresIn: string) {
    const token = jwt.sign(payload, 'thisisjwt', { expiresIn })
    return token
  }

  public async isEmailFound(email: string) {
    const foundEmail = await prisma.user.findFirst({ where: { email, isDeleted: false } })
    return foundEmail
  }
}

export const authController = new AuthController()
