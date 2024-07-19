import Joi from 'joi'

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  avatar: Joi.optional()
})
export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})
