
import { db } from "../../connection.js";



const getBoards = async () => {
  try {
    const [rows] = await db.promise().query(
      `SELECT * FROM BoardTable WHERE isDeleted = false`
    );
    return {result: rows };
  } catch (error) {
    throw error ;
  }
};

const getUserBoard = async (userId) => {
  try {
 
    const [rows] = await db.promise().query(
      `SELECT bt.* FROM BoardTable bt
      INNER JOIN boardUser bu ON bt.boardId = bu.boardId
      WHERE bu.userId = ? AND bt.isDeleted = false`,
      [userId]
    );
    return { result: rows };
  } catch (error) {
    throw  error ;
  }
};

const getBoardById = async (boardId) => {
  try {

    const [rows] = await db.promise().query(
      `SELECT * FROM BoardTable WHERE boardId = ? AND isDeleted = false`,
      [boardId]
    );
    return { result: rows };
  } catch (error) {
    throw  error ;
  }
};


const getUserEmail=async(userId)=>{
  try{
      
      const email=await db.promise().query(`select emailID from userTable where Id=?`,[userId])
     
      return {result:email}   
  }catch(error){
      throw error
  }
}


const checkUserExists=async(assignedTo)=>{
  try{
    
    const [userId]=await db.promise().query(`select Id from usertable where emailId = ?`,[assignedTo]);
    
    return {result:userId}
  }
  catch(error){
    throw error;
  }
}

const checkEmail=async(assignedTo)=>{
  try{
    
    const [email]=await db.promise().query(`select emailId from userTable where emailId='${assignedTo}'`);
    
    return {result:email}
  }catch(error){
    throw error;
  }
}




const createBoardByAdminDb=async(userId,title,assignedTo,state,type)=>{
  try{
    const newBoard = {
      userId: userId,
      title: title,
      assignedTo: assignedTo,
      state: state,
      type: type,
      isDeleted: false 
  };


  
  const [Adminresult] = await db.promise().query(
      "INSERT INTO BoardTable SET ?",
      newBoard
  );
  if(Adminresult.affectedRows){
    const boardId=Adminresult.insertId;

    const [result]=await db.promise().query(`insert into boardUser(boardId,userId,isDeleted) values(?,?,?)`,[boardId,userId,false]
  );
  if(result.affectedRows){
    return{error:null,Mainresult:Adminresult,result};
  }

  }
  }catch(error){
    throw error;
  }
}



const createBoardForUser = async (userId, title, email, state, type) => {
    try {
       
        const newBoard = {
            userId: userId,
            title: title,
            assignedTo: email,
            state: state,
            type: type,
            isDeleted: false 
        };


        
        const [boardResult] = await db.promise().query(
            "INSERT INTO BoardTable SET ?",
            newBoard
        );

        if(boardResult.affectedRows){
          const boardId=boardResult.insertId;
          const [result]=await db.promise().query(`insert into boardUser(boardId,userId,isDeleted)values(?,?,?)`,[boardId,userId,false]
        );
        if(result.affectedRows){
          return{error:null,Mainresult:boardResult,result};
        }
        }

       
    } catch (error) {

        throw  error ;
    }
};

const addAuserToAExistingBoardDb=async(userId,boardId)=>{
  try{

  const [boardResult]=await db.promise().query(`INSERT INTO boardUser (boardId,userId,isDeleted) VALUES (?, ?,?)`,[boardId,userId,false]

);
  return{result:boardResult}

  }
  catch(error){
    throw error
  }
}


const getMembersofSpecificBoardAdmin=async(boardId)=>{
  try{
    const [memberResult]=await db.promise().query(`SELECT DISTINCT u.emailId
    FROM boarduser bu
    JOIN UserTable u ON bu.userId = u.Id
    WHERE bu.boardId = ? AND u.isDeleted = false;
    ;
    `,boardId);
    return {result:memberResult}

  }catch(error){
    throw error
  }
}

const getMembersofSpecificBoardDb=async(userId,boardId)=>{
  try{
    const[memberResult]=await db.promise().query(`SELECT DISTINCT u.emailId
    FROM boarduser bu
    JOIN boarduser bu2 ON bu.boardId = bu2.boardId
    JOIN UserTable u ON bu2.userId = u.Id
    WHERE bu.userId = ? AND bu.boardId = ? AND u.isDeleted = false;
    ;
    `,[userId,boardId]
  );
  return{result:memberResult}
  }catch(error){
    throw error
  }
}


const editBoardDbAdmin = async (requiredColumns, boardId) => {
  try {
    let sql = `update boardTable set `;

    for (let column in requiredColumns) {
      sql += `${column} = '${requiredColumns[column]}', `;
    }

    sql = sql.slice(0, -2); 
    sql += ` where boardId=${boardId};`;

    const [UpdateResult] = await db.promise().query(sql);
    return { result: UpdateResult };
  } catch (error) {
    throw error;
  }
};


const editBoardDb = async (requiredColumns, userId, boardId) => {
  try {
    let sql = `update boardTable set `; 

    for (let column in requiredColumns) {
      sql += `${column} = '${requiredColumns[column]}', `;
    }
    sql = sql.slice(0, -2); 
    sql += ` where userId=${userId} and boardId=${boardId};`; 
    const [UpdateResult] = await db.promise().query(sql);
  
    
    return { result: UpdateResult };
  } catch (error) {
    throw error;
  }
};




const checkBoardExistforUser=async(boardId,userId)=>{
  try{

    const [rows] = await db.promise().query(
      `SELECT * FROM BoardTable WHERE boardId=? AND userId=? and isDeleted=false`,
      [boardId, userId]
    );

  
  return {result:rows}
  }
  catch(error){
    throw error
  }
}

const checkBoardExistAdmin=async(boardId)=>{
  try{
    const [rows]=await db.promise().query(`select * from boardTable where boardId=? and isDeleted=false`,[boardId]

    );
    return {result:rows}
  }catch(error){
    throw error
  }

}

const checkBoardExist=async(userId,boardId)=>{
  try{
    
    const [rows]=await db.promise().query(`select * from boardTable where userId=? and boardId=? and isDeleted=false`,[userId,boardId]
    );

    return{result:rows}
  }
  catch(error){
    throw error;
  }
}

const deleteBoardDbForAdmin=async(boardId)=>{
  try{
    const [rows]=await db.promise().query(`update boardTable set isDeleted=true where boardId=?`,[boardId])
    return {result:rows}
  } catch(error){
    throw error;
  }
}

const deleteBoardDb=async(boardId,userId)=>{
  try{

    const [rows]=await db.promise().query(`UPDATE BoardTable
    SET isDeleted = true
    WHERE boardId = ? AND userID = ?`,[boardId,userId]);
   
    return {result:rows}
    
  }
  catch(error){
    throw error
  }
}




export {
  getBoards,
  getUserBoard,
  getBoardById,
  getUserEmail,
  checkUserExists,
  checkBoardExistAdmin,
  checkBoardExist,
  checkEmail,
  createBoardByAdminDb,
  createBoardForUser,
  addAuserToAExistingBoardDb,
  getMembersofSpecificBoardAdmin,
  getMembersofSpecificBoardDb,
  editBoardDbAdmin,
  editBoardDb,
  checkBoardExistforUser,
  deleteBoardDbForAdmin,
  deleteBoardDb
};
