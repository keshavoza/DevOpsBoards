import express from 'express';
import rolesValidator from '../validators/roles.validator.js'
import rolesRoutes from '../controllers/roles.controllers.js';
import { authenticateJwtToken } from '../../Middlewares/jwtAuthMiddleware.js';
import { deleteAuthorize, editAuthorize, getAuthorize, postAuthorize } from '../../Middlewares/roles.middleware.js';
import{successStatusCodes} from '../../constants/statusCodes.js'
import { responseHandler } from '../../common/handlers.js';
import { validateBody } from '../../common/utils.js';
import { roleRoutes } from '../../constants/routes.constants.js';

const {GETALLROLES,GETSPECIFICROLE,ADDROLE,DELETEROLE,UPDATEROLE} = roleRoutes

const {insertRolesSchema,updateRolesSchema} = rolesValidator

const {ok} = successStatusCodes

export const roleRouter = express.Router();


roleRouter.get(GETALLROLES,authenticateJwtToken,getAuthorize,async(req,res,next)=>{
    try{
        const listOfRolesResponse = await rolesRoutes.listRoles()
        res.status(ok).send(new responseHandler(listOfRolesResponse))
    }catch(error){
        next(error)
    }
})

roleRouter.get(GETSPECIFICROLE,authenticateJwtToken,getAuthorize,async(req,res,next)=>{
    try{
        const {
            params: { roleId },
          } = req;
        const specificRoleResponse = await rolesRoutes.specificRole(roleId)
        res.status(ok).send(new responseHandler(specificRoleResponse))
    }catch(error){
        next(error)
    }
})

roleRouter.post(ADDROLE,authenticateJwtToken,postAuthorize,
validateBody(insertRolesSchema),async(req,res,next)=>{
    try {
        const {
            body: { Role },
          } = req;
        const roleAddedResponse = await rolesRoutes.insertRoles(Role);
        res.status(roleAddedResponse.statusCode).send(new responseHandler(roleAddedResponse))
    } catch (error) {
        console.log("error 3",error);
        next(error)
    }
})

roleRouter.put(UPDATEROLE,authenticateJwtToken,editAuthorize,
validateBody(updateRolesSchema),async(req,res,next)=>{
    try {
        const { body:{Role},params:{roleId} } = req
        const updateRoles = await rolesRoutes.updateRole(Role,roleId)
    res.status(updateRoles.statusCode).send(new responseHandler(updateRoles))
    } catch (error) {
        next(error);
    }
})

roleRouter.delete(DELETEROLE,authenticateJwtToken,deleteAuthorize,async(req,res,next)=>{
    try {
        const {params:{roleId}} = req;
        const roleDeleted = await rolesRoutes.deleteRole(roleId)
        res.status(roleDeleted.statusCode).send(new responseHandler(roleDeleted))
    } catch (error) {
        next(error)
    }
})