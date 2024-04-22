import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import routes from './routes'

//import swaggerFile from './swagger_output.json'

class App {
  public express: express.Application

  constructor() {
    dotenv.config()

    this.express = express()
    this.middlewares()
    this.routes()
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private routes(): void {
    this.express.use(routes)
    //this.express.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  }
}

export default new App().express