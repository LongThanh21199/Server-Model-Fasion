import * as UserController from './controllers/UserController'
import express, {Router} from "express";
import requireAuthenticated from './middlewares/requireAuthenticate';
import * as LoginController from './controllers/LoginController'
import validate from "./middlewares/validate";
import {body} from "express-validator";

const controller = (method) => (request, response, next) => {
    method(request, response, next).catch(error => next(error))
}

export default (router: Router) => {

    //register
    router.post('/register',
      validate(
        body('email').isEmail().matches(/\d/),
        body('name').isString().isLength({min: 3, max: 25})
      ),

      controller(UserController.create)
    )

    //login
    router.post(
        '/login',
        validate(
            body('email').isEmail(),
            body('password').isString()
        ),
        controller(LoginController.login)
    )

    const protectedRouter = express.Router()

    router.use('/api', protectedRouter)

    protectedRouter.use(requireAuthenticated)

    //protected get user current
    protectedRouter.get(
        '/user/me',
        controller(UserController.profile)
    )

    //protected update user current
    protectedRouter.put('/user/me/',
      controller(UserController.update)
    )

}
