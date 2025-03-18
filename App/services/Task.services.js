
import {db} from '../../connection.js';

const getAllTasks=async()=>{
    try{
        const [rows]=await db.promise().query(`select * from tasks ehre isDeleted=false`)
        return {result:rows}
    }catch(error){
        throw error
    }
};

const getUsersTask=async(userstoryId,userId)=>{
    try{
        const [rows]=await db.promise().query(`select * from tasks where userstoryId=? and userId=?`,[userstoryId,userId])
        return {result:rows}
    }catch(error){
        throw error
    }
}




const createTaskUser=async(taskName,description,state,email,remainingWork,comments,userStoryId,userId)=>{
    try{
        const newTask={
            userStoryId:userStoryId,
            userId:userId,
            taskName:taskName,
            description:description,
            state:state,
            assignedTo:email,
            remainingWork:remainingWork,
            comments:comments,
            isDeleted:false
        }

        const [TaskResult]=await db.promise().query(`insert into tasks set ?`,newTask);
        
        return{result:TaskResult}
    }catch(error){
        throw error
    }
}




export{
    getAllTasks,
    getUsersTask,
    createTaskUser
}