import { db } from "../../connection.js";

const getRolesOfUser = async (Id) => {
  try {
    
    const [result] = await db.promise().query(
      `select r.Role
            from Roles r
           join RolesForUsers ru on ru.roleId = r.Id
           where ru.userId = ? and ru.isdeleted = false;`,
      [Id]
    );
    return { error: null, result: result };
  } catch (error) {
    throw error;
  }
};

const getSpecificRoleOfUser = async(userId,roleId)=>{
  try {
    const [result] = await db.promise().query(`select * from RolesForUsers where userId = ? and roleId = ? and isDeleted = false`,[userId,roleId])
    return{error:null, result: result};
  } catch (error) {
    throw error;
  }
}



 const addRolesToUsers = async(userId,roleId) => {
  try{

    const [deleteUser] = await db.promise().query(`update RolesForUsers set isDeleted = true where userId = ?`,[userId])

    if(deleteUser.affectedRows){
      const addRoleToUser = await db.promise().query(`insert into RolesForUsers(roleId,userId,isDeleted) values (?,?,?)`,[roleId,userId,false]);
      return{error:null, result: deleteUser,addRoleToUser};
    }
    else{
      throw error;
    }
  }
  catch(error){
    throw error;
  }
};


const deleteRoleofUser = async(userId,roleId)=>{
  try{
    const [result] = await db.promise().query(`update RolesForUsers set isDeleted = true where userId = ? and roleId = ?`,[userId,roleId])
    return{error:null, result: result};
  }catch(error){
    throw error;
  }
}


export default {
  getRolesOfUser,
  getSpecificRoleOfUser,
  addRolesToUsers,
  deleteRoleofUser,
};
