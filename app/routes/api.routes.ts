import * as winston from 'winston'
import {UsersController, RegistrationController, SessionController} from '../controllers'
import { verifyJWT_MW } from '../config/middlewares'

export function initRoutes(app, router) {
  winston.log('info', '--> Initialisations des routes')
  let apiRoute = router
  const users = new UsersController()
  const registration = new RegistrationController()
  const session = new SessionController()
  apiRoute.get('/', (req, res) => res.status(200).send({message: 'Api Server is running!'}))
  apiRoute.post('/login', session.login)
  apiRoute.post('/signup/', registration.signup)

  apiRoute.route('*').all(verifyJWT_MW)

  apiRoute.get('/users/',  users.list)
  apiRoute.post('/users/:id', users.update)

  return apiRoute
}
