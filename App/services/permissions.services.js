import { db } from "../../connection.js";

const listPermissions = async () => {
  try {
    const [result] = await db
      .promise()
      .query(`select Id,permission from permissions where isDeleted = false`);
    return { error: null, result: result };
  } catch (error) {
    throw error;
  }
};

const specificPermission = async (Id) => {
  try {
    const [result] = await db
      .promise()
      .query(
        `select Id,permission from permissions where isDeleted = false and Id = ?`,
        [Id]
      );
    return { error: null, result: result };
  } catch (error) {
    throw error;
  }
};

const addPermission = async (permission) => {
  try {
    const [result] = await db
      .promise()
      .query(`insert into permissions(permission,isDeleted) values (?,?)`, [
        permission,
        false,
      ]);

    return { error: null, result: result };
  } catch (error) {
    throw error;
  }
};

const searchBypermissions = async (permission) => {
  try {
    const [result] = await db
      .promise()
      .query(`select * from permissions where permission = ? and isDeleted = false`, [permission]);
    return { error: null, result: result };
  } catch (error) {
    throw error;
  }
};

const getIdFromPermission = async(permissionName)=>{
  try {
    const [result] = await db.promise().query(`SELECT Id
    FROM Permissions
    WHERE permission LIKE '%${permissionName}%' and isDeleted = false;`)
    return{error:null, result:result}
  } catch (error) {
    throw error;
  }

}

const editPermission = async (Id, permission) => {
  try {
    const [result] = await db
      .promise()
      .query(
        `update permissions set permission = ? where Id = ? and isDeleted = false`,
        [permission, Id]
      );

    return { error: null, result: result };
  } catch (error) {
    throw error;
  }
};

const deletePermission = async (Id) => {
    try {
        const [result] = await db
              .promise()
              .query("update permissions set isDeleted = true where Id = ?", [Id]);
            if (result.affectedRows) {
              const permissionRoleDelete = await db
                .promise()
                .query(
                  `update permissionForRoles set isDeleted = true where permissionId = ?`,
                  [Id]
                );
              return { error: null, result: result, permissionRoleDelete };
            } else {
              throw {
                error: "Role not found or not updated",
                result: null,
                userRoleDelete: null,
              };
            }
    } catch (error) {
        throw(error)
    }
};


export default {
  listPermissions,
  specificPermission,
  addPermission,
  searchBypermissions,
  editPermission,
  deletePermission,
  getIdFromPermission
};
