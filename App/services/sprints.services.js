


import { db } from "../../connection.js";


const getAllSprints = async () => {
    try {
        const [rows] = await db.promise().query(`SELECT * FROM sprint WHERE isDeleted=false`);
        return { result: rows };
    } catch (error) {
        throw error;
    }
};

const getSprintById = async (boardId, sprintId) => {
    try {
        const [rows] = await db.promise().query(`select * from sprint where boardId=? and sprintId=? and isDeleted=false`, [boardId, sprintId]
        );
        
        return { result: rows }
    }
    catch (error) {
        throw error;
    }
}


const getUserSprints = async (boardId,userId) => {
    try {
        
        const [rows] = await db.promise().query(
       
        `SELECT s.sprintId, s.boardId, s.sprintName, s.startDate, s.endDate
        FROM sprint AS s
        INNER JOIN sprintuser AS su ON s.sprintId = su.sprintId
        WHERE s.boardId = ? AND su.userId = ? AND su.isDeleted = false AND s.isDeleted = false;
        
         `, 
        [boardId,userId]
       
        );
    
        return { result: rows }
    }
    catch (error) {
        throw error;
    }
}


const getMembersofSpecificSprintAdminDb=async(sprintId)=>{
    try{
        const [rows]=await db.promise().query(`SELECT DISTINCT u.emailId
        FROM sprintuser su
        JOIN sprintuser su2 ON su.sprintId = su2.sprintId
        JOIN UserTable u ON su2.userId = u.Id
        WHERE su.sprintId = ? 
            AND u.isDeleted = false;
        `,[sprintId]
    );
    return {result:rows}
    }catch(error){
        throw error;
    }
}

const getMembersofSpecificSprintDb=async(userId,sprintId)=>{
    try{
        const [rows]=await db.promise().query(`SELECT DISTINCT u.emailId
        FROM sprintuser su
        JOIN sprintuser su2 ON su.sprintId = su2.sprintId
        JOIN UserTable u ON su2.userId = u.Id
        WHERE su.userId = ? 
            AND su.sprintId = ? 
            AND u.isDeleted = false;
        
        `,[userId,sprintId]
    );
    return {result:rows}
    }catch(error){
        throw error;
    }
}


const createSprintForUser = async (sprintName, startDate, endDate, boardId, userId) => {

    try {


        const newSprint = {

            // userId:userId,
            boardId: boardId,
            sprintName: sprintName,
            startDate: startDate,
            endDate: endDate,
            isDeleted: false
        };

        const [sprintResult] = await db.promise().query("insert into sprint set ?", newSprint
        );

        if (sprintResult.affectedRows) {
            const sprintId = sprintResult.insertId;
            const [result] = await db.promise().query(`insert into SprintUser(sprintId,userId,isDeleted)values(?,?,?)`, [sprintId, userId, false]
            );
            if (result.affectedRows) {
                return { error: null, Mainresult: sprintResult, result };
            }
        }
    }
    catch (error) {
        throw error
    }
};



const checkBoardForThatUserExists = async (boardId, userId) => {
    try {
        const [rows] = await db.promise().query(`select * from boardTable where boardId=? and userId=? and isDeleted=false`, [boardId, userId]
        );
        
        return { result: rows }
    }
    catch (error) {
        throw error;
    }
}

const checkSprintExistsAdmin = async (sprintId) => {
    try {
   
        const [rows] = await db.promise().query(`select * from sprint where sprintId=? and isDeleted=false`, sprintId)
        
        return { result: rows }
    } catch (error) {
        throw error
    }
}

const checkUserExistsAdmin = async (userId, boardId) => {
    try {
        const [rows] = await db.promise().query(`select * from boardTable where userId=? and boardId=? and isDeleted=false`, [userId, boardId]

        );
        return { result: rows }
    } catch (error) {
        throw error;
    }

}

const createSprintByAdminDb = async (Id, boardId, sprintName, startDate, endDate) => {
    try {

        const newSprint = {
            boardId: boardId,
            sprintName: sprintName,
            startDate: startDate,
            endDate: endDate,
            isDeleted: false
        };


        const [Adminresult] = await db.promise().query(`insert into sprint set ?`, newSprint);


        if (Adminresult.affectedRows) {

            const sprintId = Adminresult.insertId;
            const [result] = await db.promise().query(`insert into sprintUser(sprintId,userId,isDeleted) values(?,?,?)`, [sprintId, Id, false]
            );
            if (result.affectedRows) {
                return { error: null, Mainresult: Adminresult, result };
            }

        }

    } catch (error) {
        throw error;
    }
}

const checkSprintExists = async (sprintId, userId) => {
  
    try {

        const [rows] = await db.promise().query(`SELECT s.*
        FROM SprintUser AS su
        INNER JOIN sprint AS s ON su.sprintId = s.sprintId
        WHERE su.sprintId = ? 
          AND su.userId = ? 
          AND su.isDeleted = false 
          AND s.isDeleted = false;
        
        
        `, [sprintId, userId]
        );
     

        return { result: rows }
    }
    catch (error) {
        throw error;
    }
}


const addAuserToAExistingSprintDb = async (userId, sprintId) => {
    try {
        const [sprintResult] = await db.promise().query(`insert into sprintUser (userId, sprintId, isDeleted) values (?, ?, ?)`, [userId, sprintId, false]);
        return { result: sprintResult };
    } catch (error) {
        throw error;
    }
}


const editSprintDbAdmin = async (requiredColumns, sprintId) => {
    try {
        
        let sql = `update sprint set `;
        for (let column in requiredColumns) {
            
            sql += `${column} = '${requiredColumns[column]}', `;
        }
        sql = sql.slice(0, -2); 
        sql += ` where sprintId=${sprintId};`;

        const [UpdateResult] = await db.promise().query(sql);
        
        return { result: UpdateResult };
    } catch (error) {
        throw error;
    }
};



const editSprintDb = async (requiredColumns,sprintId) => {
    try {
        
        
        let sql = `update sprint set `;
       
    

        for (let column in requiredColumns) {
            sql += `${column}= '${requiredColumns[column]}',`;
        }
        
        sql = sql.slice(0, -1);
        sql += ` where sprintId=${sprintId};`;
      
        
        const [UpdateResult] = await db.promise().query(sql);
        
        return{result:UpdateResult}

    } catch (error) {
        throw error;
    }
}

const deleteSprintDb = async (boardId,sprintId,userId) => {
    try {
        
        const [deleteSprintResult] = await db.promise().query(`update sprint
        set isDeleted=true where  sprintId=?
        `, [sprintId]
    
        );
    
        if (deleteSprintResult.affectedRows) {
         
            const [result] = await db.promise().query(`UPDATE SprintUser 
            SET isDeleted = true 
            WHERE sprintId = ?;`, [sprintId]
            );
            if (result.affectedRows) {
                return { error: null, Mainresult: deleteSprintResult, result }
            }
        }
    }
    catch (error) {
        throw error;
    }
}

export {
    getAllSprints,
    getSprintById,
    getUserSprints,
    checkBoardForThatUserExists,
    addAuserToAExistingSprintDb,
    createSprintForUser,
    createSprintByAdminDb,
    checkUserExistsAdmin,
    checkSprintExistsAdmin,
    getMembersofSpecificSprintAdminDb,
    getMembersofSpecificSprintDb,
    checkSprintExists,
    editSprintDb,
    editSprintDbAdmin,
    deleteSprintDb
}