import express from "express";
import { authenticateJwtToken } from "../../Middlewares/jwtAuthMiddleware.js";
import permissionForRoles from "../controllers/permissionForRoles.controllers.js";
import { responseHandler } from "../../common/handlers.js";
import { successStatusCodes } from "../../constants/statusCodes.js";
import { deleteAuthorize, getAuthorize, postAuthorize } from '../../Middlewares/roles.middleware.js';
import { permissionForRolesRoutes } from "../../constants/routes.constants.js";



const {GETPERMISSIONFORROLE,ADDPERMISSIONFORROLE,DELETEPERMISSIONFORROLE} = permissionForRolesRoutes
const { ok } = successStatusCodes;

export const router = express.Router();


router.get(GETPERMISSIONFORROLE,authenticateJwtToken,getAuthorize ,async (req, res, next) => {
  try {
    const {
      params: { roleId },
    } = req;
    const permissionForRolesResponse =
      await permissionForRoles.getPermissionForRoles(roleId);
    res.status(ok).send(new responseHandler(permissionForRolesResponse));
  } catch (error) {
    next(error);
  }
});

router.post(ADDPERMISSIONFORROLE,authenticateJwtToken,postAuthorize ,async (req, res, next) => {
  try {
    const {
      params: { roleId, permissionId },
    } = req;
    const addedPermissionForRolesResponse =
      await permissionForRoles.createPermissionForRoles(roleId, permissionId);
    res
      .status(addedPermissionForRolesResponse.statusCode)
      .send(new responseHandler(addedPermissionForRolesResponse));
  } catch (error) {
    next(error);
  }
});

router.delete(
  DELETEPERMISSIONFORROLE,authenticateJwtToken,deleteAuthorize,async(req,res,next)=>{
    try {
      const {
        params: { roleId, permissionId },
      } = req;
      const deletedPermissionForRolesResponse = await permissionForRoles.deletePermissionForRoles(roleId,permissionId);
      res.status(deletedPermissionForRolesResponse.statusCode).send(new responseHandler(deletedPermissionForRolesResponse));
    } catch (error) {
      next(error);
    }
  }
  
);
