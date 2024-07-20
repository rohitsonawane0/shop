import { NextFunction, Request, Response } from 'express'
import { BadRequestException, ForbiddenException, UnauthorizedException } from './error.middleware'
import jwt from 'jsonwebtoken'

export function validateId(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id)

  if (isNaN(id)) {
    throw new BadRequestException('Invalid id provided')
  }

  next()
}
