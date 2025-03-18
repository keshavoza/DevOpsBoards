import { db } from "../../connection.js";

const checkAlreadyPresent = async (emailId) => {
  try {
    const [result] = await db
      .promise()
      .query(
        "Select emailID,isDeleted,Id from UserTable where emailId = ? and isDeleted = false",
        [emailId]
      );
    return { error: null, result: result };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const login = async (emailId) => {
  try {
    const [result] = await db.promise().query(
      `SELECT u.emailID,u.password, u.Id,u.isDeleted, r.Role
      FROM UserTable u
      JOIN rolesForUsers ru ON u.Id = ru.userId
      JOIN Roles r ON ru.RoleId = r.Id
      WHERE u.emailId = ? AND u.isDeleted = false and ru.isDeleted = false`,
      [emailId]
    );
    return { error: null, result: result };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const signup = async (emailId, password) => {
  try {
    const [userResult] = await db
      .promise()
      .query(
        `insert into UserTable (emailID,password,isDeleted) values (?,?,?)`,
        [emailId, password, false]
      );
    if (userResult.affectedRows) {
      
      const userId = userResult.insertId;
      const [roleResult] = await db
        .promise()
        .query(
          `insert into rolesForUsers(userID,roleId,isDeleted) values (?,?,?)`,
          [userId, 1, false]
        );
        if(roleResult.affectedRows) {     
            return { error: null, result: userResult, roleResult };
        }
      }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  checkAlreadyPresent,
  login,
  signup,
};
