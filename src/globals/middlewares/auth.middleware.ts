import { NextFunction, Request, Response } from 'express'
import { BadRequestException, ForbiddenException, UnauthorizedException } from './error.middleware'
import jwt from 'jsonwebtoken'
export function verifyUser(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new UnauthorizedException('Missing authorization')
  }
  const token = authorization.split(' ')[1]
  // console.log(token)
  try {
    const dec = jwt.verify(token, 'thisisjwt') as UserPayload
    req.currentUser = dec
  } catch (error) {
    console.log(error)
    throw new BadRequestException('daslha')
  }
  next()
}
export function checkUserAutenticated(req: Request, res: Response, next: NextFunction) {
  if (!req.currentUser) {
    throw new ForbiddenException('Please login')
  }
  next()
}
