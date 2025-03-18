

import {getAllSprints,getUserSprints,getSprintById,createSprintForUser,deleteSprintDb,checkBoardForThatUserExists,checkSprintExists,addAuserToAExistingSprintDb,checkSprintExistsAdmin,checkUserExistsAdmin,createSprintByAdminDb,editSprintDb,editSprintDbAdmin,getMembersofSpecificSprintAdminDb,getMembersofSpecificSprintDb} from "../services/sprints.services.js"

import { sprintMessages } from "../messages/sprints.messages.js";



const {
    sprint_created,sprint_updated,sprint_deleted,unauthorized,not_found,access_forbidden,bad_request,no_content,user_added_to_sprint}=sprintMessages



export const listAllSprints = async (boardId,userId,role) => {
    try {
        if (role === "admin") {
            const result = await getAllSprints();
            return result.result;
        } else if (role === "user") {
            const userSprintsResponse = await getUserSprints(boardId,userId);
            return userSprintsResponse.result;
            
        }
    } catch (error) {
        throw error;
    }
};



export const adminSpecificSprint = async (role,boardId,sprintId) => {
    try {
   
        if (role === "admin") {
            const result = await getSprintById(boardId,sprintId)  

            return result.result
        } else {
            throw access_forbidden;
        }


    }
    catch (error) {
        throw error;
    }
}

export const getMembersofSpecificSprint=async(role,userId,sprintId)=>{
    try{
        if(role==="admin"){
            const result=await getMembersofSpecificSprintAdminDb(sprintId)
            return result.result;
        }else if(role==="user"){
            const result=await getMembersofSpecificSprintDb(userId,sprintId)
            return result.result
        }
    }catch(error){
        throw error;
    }
}


export const createSprint=async(createSprintBody,userId,boardId)=>{
    try{
        const {sprintName,startDate,endDate}=createSprintBody

      const ifBoardExists= await checkBoardForThatUserExists(boardId,userId)


      if(ifBoardExists.result.length){
     
        await createSprintForUser(sprintName,startDate,endDate,boardId,userId);

        return sprint_created;
      } 
      else{
        throw unauthorized
      }

        
    }
    catch(error){
        throw error;
    }
}

export const addAuserToAExistingSprint = async (role, userId, sprintId) => {
    try {
        
        if (role === "admin") {
           
            const check = await checkSprintExistsAdmin(sprintId);
            
            if (check.result.length) {
              
                await addAuserToAExistingSprintDb(userId, sprintId); 
                return user_added_to_sprint;
            } else {
                throw not_found;
            }
        } else {
            throw access_forbidden;
        } 
    } catch (error) {
        throw error;
    }
}

export const createSprintByAdmin=async(role,Id,boardId,createSprintBody)=>{
    try{
        
        let{sprintName,startDate,endDate}=createSprintBody

        if(role==="admin"){
            
            const ifUserExists=await checkUserExistsAdmin(Id,boardId);
            if(ifUserExists.result.length){
                
                await createSprintByAdminDb(Id,boardId,sprintName,startDate,endDate)
                return sprint_created
            }
            else{
                throw not_found
            }
        }else{
            throw access_forbidden
        }
    }catch(error){
        throw error;
    }
}

export const editSprint=async(role,requiredColumns,sprintId)=>{
    try{
       
        if(role==="admin"){
            const ifSprintExists=await checkSprintExistsAdmin(sprintId);
            if(ifSprintExists.result.length){
                await editSprintDb(requiredColumns,sprintId);
                
                return sprint_updated
            }else{
                throw not_found
            }
        }else if(role==="user"){
          
            const ifSprintExists=await checkSprintExistsAdmin(sprintId);
            if(ifSprintExists.result.length){
                
                await editSprintDb(requiredColumns,sprintId)
                
                return sprint_updated
            }else{
                throw not_found
            }
        }
}
catch(error){
    throw error
}
}

export const deleteSprint = async (role,userId,boardId,sprintId)=>{
    try {
        

        if(role==="admin"){
      
            const ifSprintExists=await checkSprintExistsAdmin(sprintId);
          
            if(ifSprintExists.result.length){
  
              
            await deleteSprintDb(sprintId);
            return sprint_deleted;
            }else{
                throw not_found
            }
            
            
        }
        else if(role==="user"){


            const ifSprintExists=await checkSprintExists(sprintId,userId);
          

            if(ifSprintExists.result.length){
            
                await deleteSprintDb(boardId,sprintId,userId);
                return sprint_deleted;  
            }
            else{
                throw unauthorized
            }
        }
    }
    catch(error){
        throw error;
    }
}

