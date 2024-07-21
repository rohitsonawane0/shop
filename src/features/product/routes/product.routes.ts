import { Router } from 'express'

import { checkUserAutenticated, verifyUser } from '~/globals/middlewares/auth.middleware'
import { validateSchema } from '~/globals/middlewares/validate.middleware'

import { validateId } from '~/globals/middlewares/validId.middleware'
import { productController } from '../controller/product.controller'
import { createProductSchema, productPaginationSchema, updateProductSchema } from '../schema/product.schema'
import { validateQuerySchema } from '~/globals/middlewares/query.middleware'

const productRoutes = Router()

productRoutes.post(
  '/',
  validateSchema(createProductSchema),
  verifyUser,
  checkUserAutenticated,
  productController.addProduct
)
productRoutes.get('/list', validateQuerySchema(productPaginationSchema), productController.listProduct)
productRoutes.get(
  '/:id',
  validateId,
  validateSchema(createProductSchema),
  verifyUser,
  checkUserAutenticated,
  productController.byIdProduct
)
productRoutes.patch(
  '/:id',
  validateId,
  validateSchema(updateProductSchema),
  verifyUser,
  checkUserAutenticated,
  productController.updateProduct
)
productRoutes.delete('/:id', validateId, verifyUser, checkUserAutenticated, productController.deleteProduct)

export default productRoutes
