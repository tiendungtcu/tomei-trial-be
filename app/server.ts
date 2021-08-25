const express = require('express')
const morgan = require('morgan')
const winston = require('winston')
const cors = require('cors')
const boom = require('express-boom')
const expressValidator = require('express-validator')
import { json, urlencoded } from 'body-parser'
import { Express } from 'express'
import * as routes from './routes/'
import {environment} from './config/'

const PORT: number = environment.port || 3000

export class Server {

  private app: Express

  constructor() {
    this.app = express()

    // Express middleware
    this.app.use(cors({
      optionsSuccessStatus: 200
    }))
    this.app.use(urlencoded({
      extended: true
    }))
    this.app.use(json())
    this.app.use(expressValidator())
    this.app.use(boom())
    this.app.use(morgan('combined'))
    this.app.listen(PORT, () => {
      winston.log('info', '--> Server successfully started at port %d', PORT)
    })
    routes.initRoutes(this.app)
  }

  getApp() {
    return this.app
  }
}
new Server()
