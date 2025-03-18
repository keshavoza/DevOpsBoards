import UserRoles from "../services/userRoles.services.js";
import { userRoleMessages } from "../messages/userRoles.messages.js";
const { ROLE_OF_USER_DELETED_SUCCESSFULLY,ROLE_OF_USER_ALREADY_EXISTS,ROLE_OF_USER_NOT_FOUND,ROLE_OF_USER_ADDED_SUCCESSFULLY } = userRoleMessages;

const getRolesOfUser = async (UserId) => {
  try {   
    const rolesOfUsers = await UserRoles.getRolesOfUser(UserId);
    return rolesOfUsers.result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addRolesToUsers = async (userId, roleId) => {
  try {
    const rolesOfUser = await UserRoles.getSpecificRoleOfUser(userId,roleId)
    if(rolesOfUser.result.length){
      throw ROLE_OF_USER_ALREADY_EXISTS;
    }
      await UserRoles.addRolesToUsers(userId,roleId);
      return ROLE_OF_USER_ADDED_SUCCESSFULLY
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteRoleofUser = async (userId, roleId) => {
  try {
    const listSpecificRoleOfUser = await UserRoles.getSpecificRoleOfUser(
      userId,
      roleId
    );

    if (listSpecificRoleOfUser.result.length) {
      await UserRoles.deleteRoleofUser(userId, roleId);
      return ROLE_OF_USER_DELETED_SUCCESSFULLY;
    } else {
      throw ROLE_OF_USER_NOT_FOUND;
    }
  } catch (error) {
    console.log(error);
    throw error.message;
  }
};

export default {
  getRolesOfUser,
  addRolesToUsers,
  deleteRoleofUser,
};
