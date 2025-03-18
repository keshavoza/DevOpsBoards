
import {db} from '../../connection.js';

const getAllEpics=async()=>{
    try{
        const [rows]=await db.promise().query(`select * from epic where isDeleted=false`);
        return {result:rows};
    }catch(error){
        throw error
    }
};


const getUserEpics=async(sprintId,userId)=>{
    try{
        const [rows]=await db.promise().query(`SELECT e.*
        FROM epic e
        JOIN epicuser eu ON e.epicId = eu.epicId
        WHERE e.sprintId = ?
            AND eu.userId = ?
            AND e.isDeleted = false;
        
        `,[sprintId,userId]
    
    );
    return {result:rows}
    }catch(error){
        throw error
    }

}



const getMembersofSpecificEpicDb=async(epicId)=>{
    try{
        const [rows]=await db.promise().query(`SELECT u.*
        FROM epicuser eu
        JOIN userTable u ON eu.userId = u.Id
        WHERE eu.epicId = ?;
        `,[epicId])
        return{result:rows}
    }catch(error){
        throw error;
    }
}

const getMembersOfSpecificEpicUser=async(epicId,userId)=>{
    try{
        const [rows]=await db.promise().query(`SELECT u.emailId
        FROM epicuser AS eu
        JOIN userTable AS u ON eu.userId = u.Id
        JOIN epic AS e ON eu.epicId = e.epicId
        WHERE eu.epicId = ?
          AND eu.userId = ?
          AND eu.isDeleted = false
          AND u.isDeleted = false;
        
        `,[epicId,userId])
        
        return {result:rows}
    }catch(error){
        throw error
    }}

const checkUserExists=async(assignedTo)=>{
    try{
      
      const [userId]=await db.promise().query(`select Id from usertable where emailId = ?`,[assignedTo]);
      
      return {result:userId}
    }
    catch(error){
      throw {error};
    }
  }

const checkSprintExistsforThatUser=async(sprintId,userId)=>{
    try{
        
        const[rows]=await db.promise().query(`SELECT * 
        FROM sprint 
        WHERE sprintId = ?
        AND sprintId IN (
            SELECT sprintId 
            FROM SprintUser 
            WHERE userId = ?
        );
         `,[sprintId,userId]
        );
        return {result:rows}
    }catch(error){
        throw error;
    }
}


const createEpicForUserFromAdmin=async(sprintId, epicName, assignedTo, description, startDate, targetDate, state,userId )=>{
   
    try{
       
        const newEpic={
            sprintId:sprintId,
            epicName:epicName,
            assignedTo:assignedTo,
            description:description,
            startDate:startDate,
            targetDate:targetDate,
            state:state,
            isDeleted:false
        }

        const [EpicResult] = await db.promise().query(
            "INSERT INTO epic SET ?",
            newEpic
        );
       
        if(EpicResult.affectedRows){
            const epicId=EpicResult.insertId;
            const [result]=await db.promise().query(`insert into epicUser(epicId,userId,isDeleted) values(?,?,?)`,[epicId,userId,false]
            
        );
      

        if(result.affectedRows){
           
            return {error:null,Mainresult:EpicResult,result};
        }
        }

    }catch(error){
        throw error
    }
}

const getUserEmail=async(userId)=>{
    try{
        const email=await db.promise().query(`select emailID from userTable where Id=?`,[userId])
        console.log(email);
        return {result:email}   
    }catch(error){
        throw error
    }
}



const createEpicForUser=async(epicName,email,description,startDate,targetDate,state,sprintId,userId)=>{
    try{
     
          const newEpic={
            sprintId:sprintId,
            epicName:epicName,
            assignedTo:email,
            description:description,
            startDate:startDate,
            targetDate:targetDate,
            state:state,
            isDeleted:false
        }

        const[EpicResult]=await db.promise().query(`insert into epic set ?`,newEpic);
        if(EpicResult.affectedRows){
            const epicId=EpicResult.insertId;
            const [result]=await db.promise().query(`insert into epicUser(epicId,userId,isDeleted) values(?,?,?)`,[epicId,userId,false]
            
        );
        if(result.affectedRows){
            return {error:null,Mainresult:EpicResult,result};
        }
        }



    }catch(error){
        throw error
    }
}




const checkEpicExists=async(epicId,userId)=>{
    try{

        const [rows]=await db.promise().query(`SELECT *
        FROM epicuser
        WHERE epicId = ? AND userId = ? and isDeleted=false; 
        `,[epicId,userId]
    );

    return {result:rows}
    }catch(error){
        throw error;
    }
}

const checkEpicExistsAdmin=async(epicId)=>{
    try{
        const [rows]=await db.promise().query(`select * from epicUser where epicId=?`,[epicId])
        return{result:rows}
    }catch(error){
        throw error;
    }
}

const editEpicDb=async(requiredColumns,epicId)=>{
    try{
      
        let sql=`update epic set `;
        for(let column in requiredColumns){
            sql+=`${column}= '${requiredColumns[column]}', `;
        }
        sql=sql.slice(0,-2);
        sql+= ` where epicId=${epicId} and isDeleted=false;`;

        const [UpdateResult]=await db.promise().query(sql);
        return{result:UpdateResult};
    }catch(error){
        throw error
    }
};

const editEpicAdmin=async(requiredColumns,epicId)=>{
    try{
        let sql=`update epic set `;
    for(let column in requiredColumns){
        sql+=`${column}='${requiredColumns[column]}', `;

    }
    sql=sql.slice(0,-2);
    sql+=` where epicId=${epicId} where isDeleted=false;`;
    const [UpdateResult]=await db.promise().query(sql);
    return{result:UpdateResult};
    }catch(error){
        throw error
    }
    

}


const deleteEpicDb=async(epicId)=>{
    try{
        const [rows]=await db.promise().query(`update epic set isDeleted=true where epicId=?`,[epicId]
        );
        
        return {result:rows}
    }catch(error){
        throw error
    }
}

const deleteEpicUser=async(epicId)=>{
    try{
        const [deleteResult]=await db.promise().query(`update epic set isDeleted=true where epicId=?`,[epicId]
        );

        if(deleteResult.affectedRows){
            const [result]=await db.promise().query(`update epicUser set isDeleted=true where epicId=?`,[epicId])
            if (result.affectedRows) {
                return { error: null, Mainresult: deleteResult, result }
            }
        }
       
    }catch(error){
        throw error
    }
}

export {
    getAllEpics,
    getUserEpics,
    getMembersofSpecificEpicDb,
    getMembersOfSpecificEpicUser,
    checkSprintExistsforThatUser,
    createEpicForUserFromAdmin,
    createEpicForUser,
    checkUserExists,
    getUserEmail,
    checkEpicExists,
    checkEpicExistsAdmin,
    editEpicDb,
    editEpicAdmin,
    deleteEpicUser,
    deleteEpicDb
}