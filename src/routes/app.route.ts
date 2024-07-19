import { Application } from 'express'
import authRoutes from '~/features/user/routes/auth.route'
import userRoutes from '~/features/user/routes/user.route'

// userRoutes

const appRoutes = (app: Application) => {
  app.use('/api/v1/users', userRoutes)
  app.use('/api/v1/auth', authRoutes)
}

export default appRoutes
