import { Application } from 'express'
import authRoutes from '~/features/user/routes/auth.route'
import userRoutes from '~/features/user/routes/user.route'
import categoryRoutes from '~/features/category/routes/category.routes'
import productRoutes from '~/features/product/routes/product.routes'
// userRoutes

const appRoutes = (app: Application) => {
  app.use('/api/v1/users', userRoutes)
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/category', categoryRoutes)
  app.use('/api/v1/products', productRoutes)
}

export default appRoutes
