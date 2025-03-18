import { db } from "../../connection.js";


const getPermissionForRoles = async(Id)=>{
    try{
        const [result] = await db.promise().query(`select r.role,p.permission from Roles R JOIN permissionForRoles pr on pr.RoleId = r.Id JOIN permissions p on p.Id = pr.permissionId where pr.RoleId = ? and pr.isDeleted = false`,[Id])
        return {error:null,result:result}
    }catch(error){
        throw error
    }
}

const getAllRolesWithPermission = async()=>{
    try{
        const resultArr = [];
        const [result] = await db.promise().query(`select pr.Id,r.role,p.permission from Roles R JOIN permissionForRoles pr on pr.RoleId = r.Id JOIN permissions p on p.Id = pr.permissionId where pr.isDeleted = false`)
        return {error:null,result:result,permission:resultArr}
    }catch(error){
        throw error
    }
}

const createPermissionForRoles = async(roleId,permissionId)=>{
    try{
        const [result] = await db.promise().query(`insert into permissionForRoles(RoleId,permissionId,isDeleted) values(?,?,?)`,[roleId,permissionId,false])
        return{error:null,result:result}
    }catch(error){
        throw error
    }
}

const permissionForRolesisPresent = async(roleId,permissionId) =>{
    try{
        const [result] = await db.promise().query(`select * from permissionForRoles where roleId = ? and permissionId = ? and isDeleted = false`,[roleId,permissionId])

        return{error:null,result:result}
    }catch(error){
        throw error
    }
}

const deletePermissionForRole = async(roleId,permissionId) =>{
    try{
        const [result] = await db.promise().query(`update permissionForRoles set isDeleted = true where roleId = ? and permissionId = ?`,[roleId,permissionId])
        
        return{error:null,result:result}
    }catch(error){
        throw error
    }
}

export default{
    getPermissionForRoles,
    createPermissionForRoles,
    permissionForRolesisPresent,
    deletePermissionForRole,
    getAllRolesWithPermission
}