import express, { Application, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import appRoutes from './routes/app.route'
import { CustomError, NotFoundException } from './globals/middlewares/error.middleware'
import { HTTPS_STATUS } from './globals/contants/http'
dotenv.config()

class Server {
  private app: Application
  constructor(app: Application) {
    this.app = app
  }

  public start(): void {
    this.setupMiddleware()
    this.setupRoutes()
    this.setupGlobalErrorHandler()

    this.startServer()
  }

  public setupMiddleware(): void {
    this.app.use(express.json())
    this.app.use(express.json())
    this.app.use(express.json())
    this.app.use(express.json())
  }
  public setupRoutes(): void {
    appRoutes(this.app)
  }
  public setupGlobalErrorHandler(): void {
    this.app.all('*', (req, res, next) => {
      next(new NotFoundException('Route not found'))
    })

    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof CustomError) {
        return res.status(err.statusCode).json(err.getErrorResponse())
      }
      console.log(err)
      return res.status(HTTPS_STATUS.INTERNAL_SERVER_ERROR).json({ status: 'error', message: 'Something went wrong' })
    })
  }

  private startServer() {
    const port = parseInt(process.env.PORT!) || 5000
    this.app.listen(port, () => {
      console.log(`server listing on port: ${port}`)
    })
  }
}

export default Server
