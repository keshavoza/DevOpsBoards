import {getAllTasks,getUsersTask,createTaskUser} from '../services/Task.services.js'



export const listAllTasks=async(userId,role,userstoryId)=>{
    try{
        if(role==="admin"){
            const result=await getAllTasks();
            return result.result
        }else if(role==="user"){
            const result=await getUsersTask(userstoryId,userId)
            return result.result
        }
    }catch(error){
        throw error
    }
}


export const createTask=async(createTaskBody,userStoryId,userId)=>{
    try{
       const {taskName,description,state,assignedTo,remainingWork,comments}=createTaskBody
       if(!assignedTo){
        const checkUserStoryExists= await checkUserStoryExistsDb(userStoryId,userId)
        if(checkUserStoryExists.result){
            const resultEmail=getUserEmail(userId)
            if((await resultEmail).result){
                const email=(await resultEmail).result[0][0].emailID;

                await createTaskUser(taskName,description,state,email,remainingWork,comments,userStoryId,userId)
                return task_created
            }else{
                throw not_found

            }
        }else{
            throw user_story_not_found
        }
       }
    }catch(error){
        throw error
    }
}
