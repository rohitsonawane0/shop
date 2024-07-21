import { NextFunction, Request, Response } from 'express'
import { Schema, ValidationErrorItem } from 'joi'
import { HTTPS_STATUS } from '../contants/http'
import { BadRequestException } from './error.middleware'

const formatJoiMessage = (error: any) => {
  return error.details[0].message
}
export const validateQuerySchema = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.query)

    if (error) {
      throw new BadRequestException(formatJoiMessage(error))
    }
    // req.dataToSave = all.value
    // console.log({ all })
    next()
  }
}
