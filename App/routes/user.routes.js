import express from 'express';
import { userRoutes } from '../../constants/routes.constants.js';
import userControllers from '../controllers/user.controllers.js'
import validators from '../validators/users.validator.js'
import { responseHandler } from '../../common/handlers.js'
import {successStatusCodes} from '../../constants/statusCodes.js'
import {validateBody} from '../../common/utils.js'

const {signupSchema,loginSchema} = validators

const {ok} = successStatusCodes;

const {SIGNUP,LOGIN} = userRoutes

export const router = express.Router();

router.post(SIGNUP,validateBody(signupSchema), async (req,res,next)=>{
    try {
        const {
            body: { emailId, password },
          } = req;
        const singupResponse = await userControllers.signupUser(emailId, password)
        res.status(singupResponse.statusCode).send(new responseHandler(singupResponse))
    } catch (error) {
        next(error)
    }
}) 

router.post(LOGIN,validateBody(loginSchema),async(req,res,next)=>{
    try {
        const {
            body: { emailId, password },
          } = req;
        const loginResponse = await userControllers.loginUser(emailId, password)
        res.status(ok).send(new responseHandler(loginResponse))
    } catch (error) {
        next(error);
    }
})