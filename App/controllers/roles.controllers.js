import roles from "../services/roles.services.js";

import { RoleMessages } from "../messages/role.messages.js";

const {
  ROLE_ALREADY_EXISTS,
  ROLE_ADDED_SUCCESSFULLY,
  UPDATE_RESTRICTED,
  UPDATE_ROLE,
  ROLE_NOT_FOUND,
  ROLE_DELETED_SUCCESSFULLY,
} = RoleMessages;

export const listRoles = async () => {
  try {
    const listOfRolesResult = await roles.getRoles();
    return listOfRolesResult.result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const specificRole = async (roleId) => {
  try {
    const listSpecificRolesResult = await roles.getSpecificRole(roleId);
    return listSpecificRolesResult.result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const insertRoles = async (Role) => {
  try {
    const roleExists = await roles.existingRoles(Role);
    if (roleExists.result.length) {
      throw ROLE_ALREADY_EXISTS;
    } else {
      roles.addRole(Role);
      return ROLE_ADDED_SUCCESSFULLY;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateRole = async (Role, roleId) => {
  try {
    if (roleId == 1 || roleId == 2) {
      throw UPDATE_RESTRICTED;
    } else {
      const roleExists = await roles.existingRoles(Role);
      if (roleExists.result.length) {
        throw ROLE_ALREADY_EXISTS;
      } else {
        const RoleExists = await roles.getSpecificRole(roleId);
        if (RoleExists.result.length) {
          await roles.editRole(roleId, Role);
          return UPDATE_ROLE;
        } else if (!RoleExists.result.length) {
          throw ROLE_NOT_FOUND;
        }
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteRole = async (roleId) => {
  try {
    if (roleId == 1 || roleId == 2) {
      throw UPDATE_RESTRICTED;
    } else {
      const RoleExists = await roles.getSpecificRole(roleId);
      if (RoleExists.result.length) {
        await roles.removeRole(roleId);
        return ROLE_DELETED_SUCCESSFULLY;
      } else if (!RoleExists.result.length) {
        throw ROLE_NOT_FOUND;
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  listRoles,
  specificRole,
  insertRoles,
  updateRole,
  deleteRole,
};
