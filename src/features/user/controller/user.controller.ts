import { NextFunction, Request, Response } from 'express'
import prisma from '~/db'
import { HTTPS_STATUS } from '~/globals/contants/http'
import { BadRequestException } from '~/globals/middlewares/error.middleware'
import { authService } from '~/service/db/auth.service'
import { catchAsync } from '~/utils/utils'

class UserController {
  public createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const createdUser = await authService.addUserToDb(req.body)
    res.status(HTTPS_STATUS.CREATED).json({
      message: 'User successfully created',
      data: createdUser
    })
  })
}

export const userController: UserController = new UserController()
