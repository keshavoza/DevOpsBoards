


import {listAlluserStory,listUsersUstory,getMembersOfSpecificUserStoryDb,getMemberSpecificUS,ifEpicExistsForThatUser,checkUserStoryExistsAdmin,addAuserToAExistingUserStoryDb,createUserStoryDb,editUserStoryUser,checkUserStoryExists,checkUserExists,createUserStoryByAdminDb,deleteuserStoryUser} from '../services/userStories.services.js'



// const { conflict_message, user_story_created, epic_updated, epic_deleted, unauthorized, epic_fetched, not_found, access_forbidden, bad_request, no_content, epic_not_found,sprint_not_found } = epicMessages

import { userStoryMessages } from '../messages/userStories.message.js';
const {user_story_created,unauthorized,user_added_to_user_story,access_forbidden,not_found,user_story_updated,user_story_deleted}=userStoryMessages

export const listAllUserStories=async(userId,role,epicId)=>{
    try{
        if(role==="admin"){
            const result=await listAlluserStory();
            return result.result
        }else if(role==="user"){
            const result =await listUsersUstory(epicId,userId)
            return result.result
        }
    }catch(error){
        throw error
    }
};

export const getUserStoriesSpecificMembers=async(role,userId,userstoryId)=>{
    try{
        if(role==="admin"){
            const result=await getMembersOfSpecificUserStoryDb(userstoryId)
            return result.result;
        }else if(role==="user"){
            const check=await checkUserStoryExists(userstoryId,userId)
            if(check.result.length){
                const result=await getMemberSpecificUS(userstoryId,userId)
                return result.result
            }else{
                throw access_forbidden
            }
           
        }
    }catch(error){
        throw error
    }
}


export const createUserStory=async(createUserStoryBody,epicId,userId)=>{
    try{
        const {userStoryName,description,state,priority,estimateHours}=createUserStoryBody

        const checkEpicExists=await ifEpicExistsForThatUser(epicId,userId)
        if(checkEpicExists.result.length){
            await createUserStoryDb(userStoryName,description,state,priority,estimateHours,epicId,userId);
            return user_story_created;
        }else{
            throw unauthorized
        }
    }catch(error){
        throw error
    }
}

export const addAuserToAExistingUserStory=async(role,userId,userstoryId)=>{
    try{
        if(role==="admin"){
            
            const check=await checkUserStoryExistsAdmin(userstoryId);
            if(check.result.length){
                await addAuserToAExistingUserStoryDb(userId,userstoryId)
                return user_added_to_user_story
            }else{
                throw access_forbidden
            }
        }
    }catch(error){
        throw error
    }
    
}


export const createUserStoryByAdmin=async(role,userId,createUserStoryBody,epicId)=>{
    try{
        const {userStoryName,description,state,priority,estimateHours}=createUserStoryBody

        if(role==="admin"){
            const ifUserExists=await checkUserExists(userId,epicId);
            
            if(ifUserExists.result.length){
                await createUserStoryByAdminDb(userId,epicId,userStoryName,description,state,priority,estimateHours)
                return user_story_created
            }else{
                throw not_found
            }
        }else{
            throw access_forbidden
        }
    }catch(error){
        throw error;
    }
}


export const editUserStory=async(role,requiredColumns,userstoryId,userId)=>{
    try{
        if(role==="admin"){
            const ifUserStoryExists=await checkUserStoryExistsAdmin(userstoryId);
          
            if(ifUserStoryExists.result.length){
                
                await editUserStoryUser(requiredColumns,userstoryId);

                return user_story_updated

            }else{
                throw not_found
            }
        }else if(role==="user"){
            const ifUserStoryExists=await checkUserStoryExists(userstoryId,userId);

            if(ifUserStoryExists.result.length){
                await editUserStoryUser(requiredColumns,userstoryId,userId)
                return user_story_updated
            }
            else{
                throw not_found
            }
        }
    }catch(error){
        throw error
    }
}


export const deleteuserStory=async(role,userId,userstoryId)=>{
    try{
        if(role==="admin"){
            const ifUserStoryExists=await checkUserStoryExistsAdmin(userstoryId);
            if(ifUserStoryExists.result.length){
                await deleteuserStoryUser(userstoryId);
                return user_story_deleted

            }else{
                throw not_found
            }
        }else if(role==="user"){
            const ifUserStoryExists=await checkUserStoryExists(userstoryId,userId)
            if(ifUserStoryExists.result.length){
                await deleteuserStoryUser(userstoryId)
                return user_story_deleted
            }
        }
    }catch(error){
        throw error
    }
}