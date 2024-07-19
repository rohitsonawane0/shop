import { Router } from 'express'

import { checkUserAutenticated, verifyUser } from '~/globals/middlewares/auth.middleware'

const categoryRoutes = Router()

categoryRoutes.get('/test', verifyUser, checkUserAutenticated, (req, res, next) => {
  res.json({ data: req.currentUser })
})

export default categoryRoutes
