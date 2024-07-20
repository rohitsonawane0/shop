import { Application } from 'express'
import authRoutes from '~/features/user/routes/auth.route'
import userRoutes from '~/features/user/routes/user.route'
import categoryRoutes from '~/features/category/routes/category.routes'
// userRoutes

const appRoutes = (app: Application) => {
  app.use('/api/v1/users', userRoutes)
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/category', categoryRoutes)
}

export default appRoutes
