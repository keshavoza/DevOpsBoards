import getPermissionForRolesServices from "../services/permissionForRoles.services.js";
import rolesServices from "../services/roles.services.js";
import permissionsService from "../services/permissions.services.js";
import { permissionForRolesMessages } from "../messages/permissionForRoles.messages.js";

const {
  PERMISSION_FOR_ROLE_ALREADY_PRESENT,
  PERMISSION_FOR_ROLE_ADDED_SUCCESSFULLY,
  PERMISSION_OR_ROLE_NOT_PRESENT,
  PERMISSION_FOR_ROLE_DELETED_SUCCESSFULLY
} = permissionForRolesMessages;

const getPermissionForRoles = async (roleId) => {
  try {
    const permissionForRolesResult =
      await getPermissionForRolesServices.getPermissionForRoles(roleId);
    return permissionForRolesResult.result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createPermissionForRoles = async (roleId,permissionId) => {
  try {
    const isRolePresent = await rolesServices.getSpecificRole(roleId);
    const isPermissionPresent = await permissionsService.specificPermission(permissionId);

    if (!isRolePresent.result.length || !isPermissionPresent.result.length) {
      throw PERMISSION_OR_ROLE_NOT_PRESENT;
    } else if (
      isPermissionPresent.result.length &&
      isRolePresent.result.length
    ) {
      const permissionForRolesisPresent =
        await getPermissionForRolesServices.permissionForRolesisPresent(
          roleId,
          permissionId
        );
      if (permissionForRolesisPresent.result.length) {
        throw PERMISSION_FOR_ROLE_ALREADY_PRESENT;
      } else if (!permissionForRolesisPresent.result.length) {
        await getPermissionForRolesServices.createPermissionForRoles(
          roleId,
          permissionId
        );
        return PERMISSION_FOR_ROLE_ADDED_SUCCESSFULLY;
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deletePermissionForRoles = async (roleId, permissionId) => {
  try {
    const permissionForRolesisPresent =
      await getPermissionForRolesServices.permissionForRolesisPresent(
        roleId,
        permissionId
      );

    if (permissionForRolesisPresent.result.length) {
        await getPermissionForRolesServices.deletePermissionForRole(
          roleId,
          permissionId
        );
        return PERMISSION_FOR_ROLE_DELETED_SUCCESSFULLY;
      
    } else if (!permissionForRolesisPresent.result.length) {
      throw PERMISSION_OR_ROLE_NOT_PRESENT
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  getPermissionForRoles,
  createPermissionForRoles,
  deletePermissionForRoles,
};
