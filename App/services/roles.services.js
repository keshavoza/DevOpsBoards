import { db } from "../../connection.js";

export const getSpecificRole = async (Id) => {
  try {
    const [result] = await db
      .promise()
      .query(`select Id,Role from Roles where Id = ? and isDeleted = false`, [
        Id,
      ]);
    return { error: null, result: result };
  } catch (error) {
    throw error;
  }
};

export const getRoles = async () => {
  try {
    const [result] = await db
      .promise()
      .query(`select Id,Role from Roles where isDeleted = false`);
    return { error: null, result: result };
  } catch (error) {
    throw error;
  }
};

export const addRole = async (Role) => {
  try {
    const [result] = await db
      .promise()
      .query(`insert into Roles (Role,isDeleted) values (?,?)`, [Role, false]);

    return { error: null, result: result };
  } catch (error) {
    throw error;
  }
};

export const existingRoles = async (Role) => {
  try {
    const [result] = await db
      .promise()
      .query(`select * from Roles where Role = ? and isDeleted = false`, [
        Role,  
      ]);

    return { error: null, result: result };
  } catch (error) {
    throw error;
  }
};

export const editRole = async (Id, Role) => {
  try {
    const [result] = await db
      .promise()
      .query(`update Roles set Role = ? where Id = ? and isDeleted = false`, [
        Role,
        Id,
      ]);
    return { error: null, result: result };
  } catch (error) {
    throw error;
  }
};

export const removeRole = async (Id) => {
  try {
    const [result] = await db
      .promise()
      .query(`update Roles set isDeleted = true where Id = ?`, [Id]);
    if (result.affectedRows) {
      const roleId = Id;
      const userRoleDelete = await db
        .promise()
        .query(`update RolesForUsers set isDeleted = true where roleId = ?`, [
          roleId,
        ]);
      return { error: null, result: result, userRoleDelete };
    } else {
      throw {
        error: "Role not found or not updated",
        result: null,
        userRoleDelete: null,
      };
    }
  } catch (error) {
    throw error;
  }
};

export const roleIdFromRole = async(role)=>{
  try {
    const [result] = await db.promise().query(`select Id from Roles where Role = ? and isDeleted = false`,[role]);
    return {error:null,result:result}
  } catch (error) {
    console.log(error);
    throw error
  }
}

export default {
  getSpecificRole,
  getRoles,
  addRole,
  existingRoles,
  editRole,
  removeRole,
};
