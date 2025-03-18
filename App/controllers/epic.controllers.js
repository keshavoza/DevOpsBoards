


import { getAllEpics, getUserEpics, checkSprintExistsforThatUser, createEpicForUserFromAdmin, checkUserExists, getUserEmail, createEpicForUser, checkEpicExists, editEpicDb, editEpicAdmin, deleteEpicDb, deleteEpicUser, checkEpicExistsAdmin, getMembersofSpecificEpicDb, getMembersOfSpecificEpicUser } from '../services/epics.services.js'


import { epicMessages } from "../messages/epics.messages.js";


const { conflict_message, epic_created, epic_updated, epic_deleted, unauthorized, epic_fetched, not_found, access_forbidden, bad_request, no_content, epic_not_found,sprint_not_found } = epicMessages


export const listAllEpics = async (userId, role, sprintId) => {
    try {

        if (role === "admin") {
            const result = await getAllEpics();
            return result.result
        } else if (role === "user") {

            const result = await getUserEpics(sprintId, userId);
            return result.result
        }
    } catch (error) {
        throw error
    }
};

export const getEpicSpecificMembers = async (role,userId,epicId) => {

    try{

        if (role === "admin") {
            const result = await getMembersofSpecificEpicDb(epicId)
            return result.result;
        } else if (role === "user") {

            const result = await getMembersOfSpecificEpicUser(epicId, userId)
            
            return result.result
        }
    }catch(error){
        throw error
    }
    }
    

export const createEpic = async (createEpicBody, sprintId, userId) => {
    try {


        const { epicName, assignedTo, description, startDate, targetDate, state } = createEpicBody

        if (!assignedTo) {

            const checkSPrintExists = await checkSprintExistsforThatUser(sprintId, userId)
            if (checkSPrintExists.result.length) {
                const resultEmail = await getUserEmail(userId)
                if (resultEmail.result.length) {

                        const email = resultEmail.result[0][0].emailID;
                        
                        await createEpicForUser(epicName, email, description, startDate, targetDate, state, sprintId, userId);
                        return epic_created
                    
                }else{
                    throw not_found
                }
            } else {
                throw sprint_not_found
            }
        }

    } catch (error) {
        throw error
    }
}


export const createEpicByAdminForUser = async (role, createEpicBody, sprintId) => {
    try {

        const { epicName, assignedTo, description, startDate, targetDate, state } = createEpicBody

        if (role === "admin") {

            const ifUserExists = await checkUserExists(assignedTo);

            if (ifUserExists.result.length) {

                const userId = ifUserExists.result[0].Id;


                await createEpicForUserFromAdmin(sprintId, epicName, assignedTo, description, startDate, targetDate, state, userId);

                return epic_created;
            } else {
                throw not_found
            }

        } else {
            throw access_forbidden
        }
    } catch (error) {
        throw error
    }

}


export const updateEpic = async (requiredColumns, userId, epicId) => {
    try {
        const ifEpicExists = await checkEpicExists(epicId, userId);

        if (ifEpicExists.result.length) {

            await editEpicDb(requiredColumns, epicId)
            return epic_updated
        } else {
            throw not_found
        }

    } catch (error) {
        throw error
    }
}

export const updateEpicAdmin = async (requiredColumns, role, epicId) => {
    try {
        const { assignedTo } = requiredColumns

        if (role === "admin") {

            if (requiredColumns.hasOwnProperty('assignedTo')) {
                const ifUserExists = await checkUserExists(assignedTo);

                if (ifUserExists.result.length) {
                    // const userId = ifUserExists.result[0].Id

                    const ifEpicExists = await checkEpicExistsAdmin(epicId)
                    if (ifEpicExists.result.length) {

                        await editEpicAdmin(requiredColumns, epicId)
                        return epic_updated
                    } else {
                        throw epic_not_found
                    }
                } else {
                    throw not_found
                }
            } else {
                await editEpicAdmin(requiredColumns, epicId)
                throw epic_updated
            }

        } else {
            throw access_forbidden
        }
    } catch (error) {
        throw error
    }
}

export const deleteEpic = async (role, userId, epicId) => {
    try {
        if (role === "admin") {
            const ifEpicExists = await checkEpicExistsAdmin(epicId)
            if (ifEpicExists.result.length) {
                await deleteEpicDb(epicId)
                return epic_deleted;
            } else {
                throw epic_not_found
            }
        } else if (role === "user") {
            const ifEpicExists = await checkEpicExists(epicId, userId)

            if (ifEpicExists.result.length) {

                await deleteEpicUser(epicId)
                return epic_deleted;
            } else {
                throw epic_not_found
            }
        }
    } catch (error) {
        throw error
    }
}