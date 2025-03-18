import { db } from "../../connection.js";

const addAttachments = async(taskId,url)=>{
    try{
        const [result] = await db.promise().query('insert into attachments(taskId,attachements,isDeleted) values (?,?,?)',[taskId,url,false])

        return{error:null,result:result}
    }catch(error){
        return{error:error}
    }
}

const getAttachments = async(taskId)=>{
    try{
        const [result] = await db.promise().query(`select Id,attachements from attachments where taskId = ? and isDeleted = false`,[taskId])
        return {error:null,result:result}
    }catch(error){
        return{error:error}
    }
}

const getSpecificAttachments = async(taskId,attachmentId) =>{
    try{
        const [result] = await db.promise().query(`select Id,attachements from attachments where taskId = ? and Id = ? and isDeleted = false`,[taskId,attachmentId])
        return {error:null,result:result}
    }catch(error){
        return{error:error}
    }
}

const deleteAttachments = async(taskId,attachmentId) =>{
    try{
        const [result] = await db.promise().query(`update attachments set isDeleted = true where Id = ? and taskId = ?`,[attachmentId,taskId])
        return {error:null,result:result}
    }catch(error){
        return{error:error}
    }
}

export default{
    addAttachments,
    getAttachments,
    getSpecificAttachments,
    deleteAttachments
}