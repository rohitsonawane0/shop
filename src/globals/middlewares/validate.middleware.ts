import { NextFunction, Request, Response } from 'express'
import { Schema, ValidationErrorItem } from 'joi'
import { HTTPS_STATUS } from '../contants/http'

const formatJoiMessage = (error: any) => {
  return error.details[0].message
}
export const validateSchema = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)
    const all = schema.validate(req.body)
    if (error) {
      return res.status(HTTPS_STATUS.BAD_REQUEST).json({ message: formatJoiMessage(error) })
    }
    // req.dataToSave = all.value
    console.log({ all })
    next()
  }
}
