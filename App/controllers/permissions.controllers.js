import permissionServices from "../services/permissions.services.js";
import { permissionMessages } from "../messages/permission.messages.js";

const {
  PERMISSION_ALREADY_EXISTS,
  PERMISSION_ADDED_SUCCESSFULLY,
  PERMISSION_EDITTED_SUCCESSFULLY,
  PERMISSION_NOT_FOUND,
  PERMISSION_DELETED_SUCCESSFULLY,
} = permissionMessages;

const listPermissions = async () => {
  try {
    const listOfPermissions = await permissionServices.listPermissions();
    return listOfPermissions.result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const specificPermission = async (permissionId) => {
  try {
    const listOfSpeificPermissions =
      await permissionServices.specificPermission(permissionId);
    return listOfSpeificPermissions.result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addPermission = async (permission) => {
  try {
    const permissionExists = await permissionServices.searchBypermissions(
      permission
    );
    if (permissionExists.result.length) {
      throw PERMISSION_ALREADY_EXISTS;
    } else if (!permissionExists.result.length) {
      await permissionServices.addPermission(permission);
      return PERMISSION_ADDED_SUCCESSFULLY;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const editPermission = async (permissionId, permission) => {
  try {
    const permissionExists = await permissionServices.searchBypermissions(
      permission)
      if (permissionExists.result.length) {
        throw PERMISSION_ALREADY_EXISTS;
      }
      else{
        const permissionExistsResult = await permissionServices.specificPermission(
          permissionId
        );
        if (permissionExistsResult.result.length) {
          await permissionServices.editPermission(permissionId, permission);
          return PERMISSION_EDITTED_SUCCESSFULLY;
        } else if (!permissionExistsResult.result.length) {
          throw PERMISSION_NOT_FOUND;
        }
      }
    
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deletePermission = async (permissionId) => {
  try {

    const permissionExistsResult = await permissionServices.specificPermission(
      permissionId
    );

    if (permissionExistsResult.result.length) {
      await permissionServices.deletePermission(permissionId);
      return PERMISSION_DELETED_SUCCESSFULLY;
    } else if (!permissionExistsResult.result.length) {
      throw PERMISSION_NOT_FOUND
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  listPermissions,
  specificPermission,
  addPermission,
  editPermission,
  deletePermission,
};
