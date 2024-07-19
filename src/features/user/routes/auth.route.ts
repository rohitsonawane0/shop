import { Router } from 'express'
import { userController } from '../controller/user.controller'
import { validateSchema } from '~/globals/middlewares/validate.middleware'
import { createUserSchema, loginUserSchema } from '../schema/user.schema'
import { authController } from '../controller/auth.controller'
import { checkUserAutenticated, verifyUser } from '~/globals/middlewares/auth.middleware'

const authRoutes = Router()

authRoutes.post('/register', validateSchema(createUserSchema), authController.registerUser)
authRoutes.post('/login', validateSchema(loginUserSchema), authController.login)
authRoutes.get('/test', verifyUser, checkUserAutenticated, (req, res, next) => {
  res.json({ data: req.currentUser })
})

export default authRoutes
