import { NextFunction, Request, Response } from 'express'
import { BadRequestException, ForbiddenException, NotFoundException, UnauthorizedException } from './error.middleware'
import jwt from 'jsonwebtoken'
import { prodcutService } from '~/service/db/product.service'

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
    throw new BadRequestException('JWT expired please login')
  }
  next()
}
export function checkUserAutenticated(req: Request, res: Response, next: NextFunction) {
  if (!req.currentUser) {
    throw new ForbiddenException('Please login')
  }
  next()
}

export function checkPermision(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.currentUser.role)) {
      console.log({ currentUser: req.currentUser, ip: req.ip, time: new Date() })
      throw new ForbiddenException('You are not allowed to perform this action')
    }
    next()
  }
}
export const checkPermissionForAminAndMerchant = checkPermision('ADMIN', 'MERCHANT')

export async function authorize(req: Request, res: Response, next: NextFunction) {
  try {
    const { baseUrl, params } = req
    const model = baseUrl.split('/api/v1/')[1]?.split('/')[0] // Extract the model correctly

    if (!model) {
      throw new NotFoundException('Invalid route')
    }

    switch (model) {
      case 'products': {
        // Block scope for variable declarations
        const product = await prodcutService.getById(Number(params.id))
        if (!product) {
          throw new NotFoundException('Product not found')
        }
        if (product.merchantId !== req.currentUser.id) {
          throw new ForbiddenException('Unauthorized')
        }
        break
      }
      // Add more cases if needed
      default:
        throw new ForbiddenException('Unauthorized access')
    }

    next()
  } catch (error) {
    next(error) // Pass the error to the next middleware
  }
}
