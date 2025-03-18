import express from 'express';
import userRoleControllers from '../controllers/userRoles.controllers.js';
import { authenticateJwtToken } from '../../Middlewares/jwtAuthMiddleware.js';
import {responseHandler} from '../../common/handlers.js'
import { deleteAuthorize, getAuthorize, postAuthorize } from '../../Middlewares/roles.middleware.js';
import { userRoleRoutes } from '../../constants/routes.constants.js';
import {successStatusCodes} from '../../constants/statusCodes.js'

const {ok} = successStatusCodes;
const {GETUSERROLES,ADDUSERROLE,DELETEUSERROLE} = userRoleRoutes

export const router = express.Router();


router.get(GETUSERROLES,authenticateJwtToken,getAuthorize,async(req,res,next)=>{
    try {
        
        const {params:{UserId}} = req;
        const rolesOfUserList = await userRoleControllers.getRolesOfUser(UserId)
        res.status(ok).send(new responseHandler(rolesOfUserList))
    } catch (error) {
        next(error);
    }
})

router.post(ADDUSERROLE,authenticateJwtToken,postAuthorize,async(req,res,next)=>{
    try {
        const {
            params: { userId, roleId },
          } = req;
        const addRolesToUserResponse = await userRoleControllers.addRolesToUsers(userId,roleId);
        
        res.status(addRolesToUserResponse.statusCode).send(new responseHandler(addRolesToUserResponse))
        
    } catch (error) {
        next(error)
    }
}
)

router.delete(DELETEUSERROLE,authenticateJwtToken,deleteAuthorize,async(req,res,next)=>{
    try{
    const {
        params: { userId, roleId },
      } = req;
        const deletedRolesResponse =await userRoleControllers.deleteRoleofUser(userId, roleId)

    res.status(deletedRolesResponse.statusCode).send(deletedRolesResponse)
    }catch(error){
        next(error);
    }
})

