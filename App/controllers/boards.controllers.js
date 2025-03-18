

import { getUserBoard, getBoards, getBoardById, checkUserExists, createBoardForUser, checkBoardExistforUser, addAuserToAExistingBoardDb, deleteBoardDb, deleteBoardDbForAdmin, checkBoardExist,createBoardByAdminDb,editBoardDb,editBoardDbAdmin,checkBoardExistAdmin,getMembersofSpecificBoardAdmin,getMembersofSpecificBoardDb,getUserEmail,checkEmail } from "../services/boards.services.js"



import { boardsMessages } from "../messages/boards.messages.js";



const { board_fetched, conflict_message, unauthorized, board_created, board_updated, board_deleted, access_forbidden, bad_request, not_found, user_added_to_existing_board,board_not_found } = boardsMessages


export const listBoards = async (userId, role) => {
    try {

        if (role === "admin" || role === 'editor') {
            const result = await getBoards();

            return result.result;

        } else if (role === "user") {
            const userBoardsResponse = await getUserBoard(userId);

            return userBoardsResponse.result;
        }
    } catch (err) {
        throw err;
    }
};



export const adminSpecificBoard = async (role, boardId) => {
    try {

        if (role === "admin") {

            const result = await getBoardById(boardId);


            return result.result;


        } else {

            throw access_forbidden;
        }
    } catch (error) {
        throw error;
    }
};


export const getMembersofSpecificBoard = async(role,userId,boardId)=>{
    try{
        if(role==="admin"){
            const result=await getMembersofSpecificBoardAdmin(boardId);
            return result.result
        }
        else if(role==="user"){
            const result=await getMembersofSpecificBoardDb(userId,boardId);
            return result.result
        }
       
    }catch(error){
        throw error;
    }
}


export const createBoard = async (createBoardBody, userId) => {
    try {
        let { title, assignedTo, state, type } = createBoardBody;

        if(!assignedTo){
            const resultEmail = await getUserEmail(userId)
            if(resultEmail.result.length){
                const email = resultEmail.result[0][0].emailID;
                await createBoardForUser(userId, title, email, state, type);
                return board_created
            }else{
                throw not_found
            }
        }


    } catch (error) {

        throw error;
    };
}

export const createBoardByAdmin=async(role,createBoardBody)=>{
    try{

        let { title, assignedTo, state, type } = createBoardBody;

        if(role==="admin"){
            const ifUserExists=await checkUserExists(assignedTo); 
          
            if(ifUserExists.result.length){
                const userId = ifUserExists.result[0].Id;

               await createBoardByAdminDb(userId,title,assignedTo,state,type)
               return board_created;
            }else{
                throw not_found;
            }
        }
        else{
            throw access_forbidden
        }
    }catch(error){
        throw error;
    }
    
}


export const addAuserToAExistingBoard = async (role,userId,boardId) => {
   
    try {
        if (role === "admin") {
            
            const check = await checkBoardExistAdmin(boardId);
          ;
  
            if (check.result.length) {

                await addAuserToAExistingBoardDb(userId,boardId)
                return user_added_to_existing_board;
            }
            else {
                throw not_found
            }

        }
        else {
            throw access_forbidden
        }


    }
    catch (error) {
        throw error;
    }

}


export const editBoard=async(requiredColumns,role,userId,boardId)=>{
    try{
       
        if(role==="admin"){
            const ifBoardExists=await checkBoardExistAdmin(boardId)
            if(ifBoardExists.result.length){
                await editBoardDbAdmin(requiredColumns,boardId)
                return board_updated;
            }
            else{
                throw not_found
            }
        } else if(role==="user"){
            const ifBoardExists=await checkBoardExist(userId,boardId);
            if(ifBoardExists.result.length){
                await editBoardDb(requiredColumns,userId,boardId)
                return board_updated;
            }
            else{
                throw not_found
            }
        }
    }catch(error){
        throw error;
    }
    
}

export const editBoardAdmin=async(requiredColumns,role,boardId)=>{
    try{
        const {assignedTo}=requiredColumns
        if(role==="admin"){
            if(requiredColumns.hasOwnProperty('assignedTo')){
                
                const checkEmailExists=await checkEmail(assignedTo)
          
                if (checkEmailExists.result.length){
                
                    const email=checkEmailExists.result[0].emailId
                   
                    requiredColumns['assignedTo'] = email;
                    const ifBoardExists=await checkBoardExistAdmin(boardId)
                    if(ifBoardExists.result.length){
                        
                        await editBoardDbAdmin(requiredColumns,boardId)
                        return board_updated;
                    }else{
                        throw board_not_found;  
                    }
                }else{
                    throw not_found
                }
            }else{
                await editBoardAdmin(requiredColumns,boardId)
            }
        }else{
            throw access_forbidden
        }
    }catch(error){
        throw error;
    }
}


export const deleteBoard = async (userId, role, boardId) => {
    try {

        if (role === "admin") {

            await deleteBoardDbForAdmin(boardId);

            return board_deleted
        }

        else if (role === "user") {

            const result = await checkBoardExistforUser(boardId, userId)

            if (result.result.length) {
                await deleteBoardDb(boardId, userId)
                return board_deleted;
            }
            else {
                throw unauthorized
            }
        }
    }
    catch (error) {
        throw error
    }
}


