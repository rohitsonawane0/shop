import express, { Application } from 'express'
import Server from './server'

class ShopApplication {
  public run(): void {
    const app: Application = express()
    const server = new Server(app)
    server.start()
  }
}

const shopApplication = new ShopApplication()

shopApplication.run()
