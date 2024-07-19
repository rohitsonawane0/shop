import { number } from 'joi'
import { HTTPS_STATUS } from '../contants/http'

export abstract class CustomError extends Error {
  abstract status: string
  abstract statusCode: number
  constructor(message: string) {
    super(message)
  }

  public getErrorResponse() {
    return {
      status: this.status,
      message: this.message
    }
  }
}

export class BadRequestException extends CustomError {
  status: string = 'error'
  statusCode: number = HTTPS_STATUS.BAD_REQUEST
  constructor(message: string) {
    super(message)
  }
}
export class UnauthorizedException extends CustomError {
  status: string = 'error'
  statusCode: number = HTTPS_STATUS.UNAUTHORIZED
  constructor(message: string) {
    super(message)
  }
}
export class ForbiddenException extends CustomError {
  status: string = 'error'
  statusCode: number = HTTPS_STATUS.FORBIDDEN
  constructor(message: string) {
    super(message)
  }
}
export class NotFoundException extends CustomError {
  status: string = 'error'
  statusCode: number = HTTPS_STATUS.NOT_FOUND
  constructor(message: string) {
    super(message)
  }
}
export class InternalServerException extends CustomError {
  status: string = 'error'
  statusCode: number = HTTPS_STATUS.INTERNAL_SERVER_ERROR
  constructor(message: string) {
    super(message)
  }
}
// export class BadRequestException extends CustomError {
//   status: string = 'error'
//   statusCode: number = HTTPS_STATUS.BAD_REQUEST
//   constructor(message: string) {
//     super(message)
//   }
// }
