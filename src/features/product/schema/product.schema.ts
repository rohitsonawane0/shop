import Joi from 'joi'
import { OrderBy, Sort } from '../interface/product.interface'
//00
export const createProductSchema = Joi.object({
  name: Joi.string().required().alphanum(),
  longDescription: Joi.string().required().min(100),
  shortDescription: Joi.string().required().max(255),
  quantity: Joi.number().required().positive(),
  categoryId: Joi.number().required().positive()
  // mainImage: Joi.string().required()
})
export const updateProductSchema = Joi.object({
  name: Joi.string().optional().alphanum(),
  longDescription: Joi.string().optional().min(100),
  shortDescription: Joi.string().optional().max(255),
  quantity: Joi.number().optional().greater(-1),
  categoryId: Joi.number().optional().positive(),
  mainImage: Joi.string().optional()
})
export const productPaginationSchema = Joi.object({
  page: Joi.string().pattern(/^\d+$/).message('page must be a number').optional(),
  limit: Joi.string().pattern(/^\d+$/).message('limit must be a number').optional(),
  orderBy: Joi.string()
    .valid(...Object.values(OrderBy))
    .optional(),
  sort: Joi.string()
    .valid(...Object.values(Sort))
    .optional(),
  filterBy: Joi.string().optional(),
  filterValueParams: Joi.string().optional()
})
