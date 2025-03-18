
import { db } from '../../connection.js';

const listAlluserStory = async () => {
    try {
        const [rows] = await db.promise().query(`select * from userstories where isDeleted=false`);
        return { result: rows }
    } catch (error) {
        throw error
    }
};

const listUsersUstory = async (epicId, userId) => {
    try {
        const [rows] = await db.promise().query(`SELECT userstories.*
        FROM userstories
        JOIN userstoryusers ON userstories.userStoryId = userstoryusers.userStoryId
        WHERE userstoryusers.userId = ?
        AND userstories.epicId = ?
        and userstories.isDeleted=false
        and userstoryusers.isDeleted=false
        ;
        `, [userId,epicId ]
        );
        return { result: rows }
    } catch (error) {
        throw error
    }
}

const getMembersOfSpecificUserStoryDb = async (userstoryId) => {
    try {
        const [rows] = await db.promise().query(`SELECT userTable.emailId
        FROM userTable
        JOIN userstoryusers ON userTable.Id = userstoryusers.userId
        WHERE userstoryusers.userStoryId = ?
        AND userTable.isDeleted = false
        and userstoryusers.isDeleted=false;
        `, [userstoryId])

        return { result: rows }
    } catch (error) {
        throw error
    }
}

const getMemberSpecificUS = async (userstoryId, userId) => {
    try {
        const [rows] = await db.promise().query
            (`SELECT userTable.Id AS userId, userTable.emailId
            FROM userTable
            JOIN userstoryusers ON userTable.Id = userstoryusers.userId
            WHERE userstoryusers.userStoryId = ?
            AND userTable.isDeleted = false
            and userstoryusers.isDeleted = false;
                    
        `, [userstoryId, userId])
        return { result: rows }
    } catch (error) {
        throw error
    }
}


const ifEpicExistsForThatUser = async (epicId, userId) => {
    try {
        const [rows] = await db.promise().query(`select * from epic where epicId=? and epicId IN (select epicId from epicUser where userId=?);`, [epicId, userId]);
        return { result: rows }
    } catch (error) {
        throw error
    }
}



const createUserStoryDb = async (userStoryName, description, state, priority, estimateHours, epicId, userId) => {
    try {
        const newUserStory = {
            epicId: epicId,
            userStoryName: userStoryName,
            description: description,
            state: state,
            priority: priority,
            estimateHours: estimateHours,
            isDeleted: false
        };

        const [userStoryResult] = await db.promise().query(`insert into userstories set ?`, newUserStory);


        if (userStoryResult.affectedRows) {
            const userStoryId = userStoryResult.insertId;
            const [result] = await db.promise().query(`insert into userstoryusers(userStoryId,userId,isDeleted)values(?,?,?)`, [userStoryId, userId, false]);

            if (userStoryResult.affectedRows) {
                return { error: null, Mainresult: userStoryResult, result };
            }
        }

    }catch(error){
        throw error
    }
  
};


const editUserStoryUser=async(requiredColumns,userstoryId)=>{
    try{
        let sql=`update userstories set `;
        for (let column in requiredColumns){
            sql+=`${column}= '${requiredColumns[column]}',`;
        }
        sql=sql.slice(0,-1);
        sql+=` where userStoryId=${userstoryId}`;

        const [UpdateResult]=await db.promise().query(sql);
        return {result:UpdateResult}
    }catch(error){
        throw error;
    }
}





const checkUserStoryExistsAdmin = async (userstoryId) => {
    try {
        const [rows] = await db.promise().query(`select * from userstories where userStoryId=? and isDeleted=false`, userstoryId)
        return { result: rows }
    } catch (error) {
        throw error
    }
}

const addAuserToAExistingUserStoryDb = async (userId, userstoryId) => {
    try {
        const [userStoryResult] = await db.promise().query(`insert into userstoryusers (userId,userstoryId,isDeleted) values (?,?,?)`, [userId, userstoryId, false]);
        return { result: userStoryResult }
    } catch (error) {
        throw error
    }
}

const checkUserStoryExists=async(userStoryId,userId)=>{
    try{
        const [rows]=await db.promise().query(`select * from userstoryusers where userStoryId=? and userId=?`,[userStoryId,userId])
        return{result:rows}
    }catch(error){
        throw error
    }
}

const checkUserExists=async(userId,epicId)=>{
    try{
        const [rows]=await db.promise().query(`select * from epicuser where userId=? and epicId=?`,[userId,epicId])
        return {result:rows}
    }catch(error){
        throw error
    }
}

const createUserStoryByAdminDb=async(userId,epicId,userStoryName,description,state,priority,estimateHours)=>{
    try{
        const newUs={
            epicId:epicId,
            userStoryName:userStoryName,
            description:description,
            state:state,
            priority:priority,
            estimateHours:estimateHours,
            isDeleted: false
        };

        const [Adminresult]=await db.promise().query(`insert into userstories set ?`,newUs);

        if(Adminresult.affectedRows){
            const userStoryId=Adminresult.insertId;
            const [result]=await db.promise().query(`insert into userstoryusers(userStoryId,userId,isDeleted) values(?,?,?)`,[userStoryId,userId,false])
            if(result.affectedRows){
                return{error:null,Mainresult:Adminresult,result}
            }
        }
    }catch(error){
        throw error
    }
}

const deleteuserStoryUser=async(userstoryId)=>{
    try{
        const[deleteResult]=await db.promise().query(`update userstories set isDeleted=true where userstoryId=?`,[userstoryId])
        if(deleteResult.affectedRows){
            const [result]=await db.promise().query(`update userstoryusers set isDeleted=true where userstoryId=?`,[userstoryId])
            if (result.affectedRows) {
                return { error: null, Mainresult: deleteResult, result }
            }
        }
    }catch(error){
        throw error
    }
}


export {
    listAlluserStory,
    listUsersUstory,
    getMembersOfSpecificUserStoryDb,
    getMemberSpecificUS,
    ifEpicExistsForThatUser,
    checkUserStoryExistsAdmin,
    checkUserStoryExists,
    addAuserToAExistingUserStoryDb,
    createUserStoryDb,
    editUserStoryUser,
    checkUserExists,
    createUserStoryByAdminDb,
    deleteuserStoryUser
}