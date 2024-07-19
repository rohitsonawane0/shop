import { Router } from 'express'
import { userController } from '../controller/user.controller'
import { validateSchema } from '~/globals/middlewares/validate.middleware'
import { createUserSchema } from '../schema/user.schema'

const userRoutes = Router()

// userRoutes.post('/register', validateSchema(createUserSchema), userController.createUser)

export default userRoutes
