import permissionForRoles from "../App/services/permissionForRoles.services.js";
import { roleIdFromRole } from "../App/services/roles.services.js";
import dotenv from "dotenv";
import { messageHandler } from "../common/handlers.js";
import { errorStatusCodes } from "../constants/statusCodes.js";
import { errorMessages } from "../constants/resMessages.js";
import permissions from '../App/services/permissions.services.js'

dotenv.config();

const {getIdFromPermission} = permissions

const { forbiddenMessage } = errorMessages;

const { forbidden } = errorStatusCodes;

const { permissionForRolesisPresent } = permissionForRoles;

const authorize = async (permissionId, role) => {
  try {
    const getRoleIdFromRole = await roleIdFromRole(role);
    const permissionForRolesisPresentResult = await permissionForRolesisPresent(
      getRoleIdFromRole.result[0].Id,
      permissionId
    );
    if (permissionForRolesisPresentResult.result.length) {
      return permissionForRolesisPresentResult.result.length;
    } else {
      throw new messageHandler(forbidden, forbiddenMessage);
    }
  } catch (error) {
    console.log("error 1",error);
    throw error;
  }
};

export const getAuthorize = async (req, res, next) => {
  try {
    const {
      locals: { role },
    } = res;
    const permissionId = await getIdFromPermission('view')
    const result = await authorize(permissionId.result[0].Id, role);
    if (result) {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const postAuthorize = async(req, res, next) => {
  try {
    const {
      locals: { role },
    } = res;
    const permissionId = await getIdFromPermission('add')
    const result = await authorize(permissionId.result[0].Id, role);
    if (result) {
      next();
    }
  } catch (error) {
    console.log("error 2",error);
     next(error);
  }
};

export const editAuthorize = async(req, res, next) => {
  try {
    const {
      locals: { role },
    } = res;
    const permissionId = await getIdFromPermission('edit')
    const result = await authorize(permissionId.result[0].Id, role);
    if (result) {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const deleteAuthorize = async(req, res, next) => {
  try {
    const {
      locals: { role },
    } = res;
    const permissionId = await getIdFromPermission('delete')
    const result = await authorize(permissionId.result[0].Id, role);
    if (result) {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export default {
  authorize,
};
