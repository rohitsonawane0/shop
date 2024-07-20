import { Router } from 'express'

import { checkUserAutenticated, verifyUser } from '~/globals/middlewares/auth.middleware'
import { validateSchema } from '~/globals/middlewares/validate.middleware'
import { categoryController } from '../controller/category.controller'
import { createCategorySchema } from '../schema/category.schema'
import { validateId } from '~/globals/middlewares/validId.middleware'

const categoryRoutes = Router()

categoryRoutes.post(
  '/',
  validateSchema(createCategorySchema),
  verifyUser,
  checkUserAutenticated,
  categoryController.addCategory
)
categoryRoutes.get('/list', categoryController.allCategory)
categoryRoutes.get('/:id', validateId, categoryController.byIdCategory)
categoryRoutes.patch('/:id', validateId, verifyUser, checkUserAutenticated, categoryController.updateCategory)
categoryRoutes.delete('/:id', validateId, verifyUser, checkUserAutenticated, categoryController.deleteCategory)

export default categoryRoutes
