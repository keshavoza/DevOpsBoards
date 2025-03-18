import express from "express";
import {listAllUserStories,getUserStoriesSpecificMembers,createUserStory,addAuserToAExistingUserStory,createUserStoryByAdmin,editUserStory,deleteuserStory} from "../controllers/userStories.controllers.js"
import { responseHandler } from "../../common/handlers.js";

export const router =express.Router();



import { successStatusCodes } from "../../constants/statusCodes.js";
import { authenticateJwtToken } from "../../Middlewares/jwtAuthMiddleware.js";
// import validators from '../validators/'

// import { validateBody } from "../../common/utils.js";

// const {createUserStorySchema,editUserStorySchema}=validators
const {ok}=successStatusCodes

router.get('/getAllUserStory/:epicId',authenticateJwtToken,async(req,res,next)=>{
    try{
        const {locals:{userId,role}}=res;
        const {params:{epicId}}=req;
        const result=await listAllUserStories(userId,role,epicId);
        res.status(ok).send(new responseHandler(result))
    }catch(error){
        next (error);
    }
});

router.get('/getMembersOfSpecificUserStory/:userStoryId',authenticateJwtToken,async(req,res,next)=>{
    try{
        const {locals:{role,userId}}=res;
        const {params:{userStoryId}}=req;
        const result=await getUserStoriesSpecificMembers(role,userId,userStoryId);
        res.status(ok).send(new responseHandler(result))
    }catch(error){
        next(error)
    }
})


router.post('/createUserStory/:epicId',authenticateJwtToken,async(req,res,next)=>{
    try{
        const {body:createUserStoryBody}=req;
        const {params:{epicId}}=req;
        const {locals:{userId}}=res;

        const result=await createUserStory(createUserStoryBody,epicId,userId);
        res.status(result.statusCode).send(new responseHandler(result))
    }catch(error){
        next(error)
    }
})


router.post('/createuserStoryAdmin/:userId/:epicId',authenticateJwtToken,async(req,res,next)=>{
    try{
        const{body:createUserStoryBody}=req;
        const {locals:{role}}=res;
        const {params:{userId,epicId}}=req;
        const result=await createUserStoryByAdmin(role,userId,createUserStoryBody,epicId);
        res.status(result.statusCode).send(new responseHandler(result))
    }catch(error){
        next(error)
    }
})

router.post('/adduserToExistinguserStory/:userId/:userStoryId',authenticateJwtToken,async(req,res,next)=>{
    try{
        const {locals:{role}}=res;
        const {params:{userId,userStoryId}}=req;
        const result=await addAuserToAExistingUserStory(role,userId,userStoryId);
        res.status(result.statusCode).send(new responseHandler(result))
    }catch(error){
        next(error)
    }
})

router.put('/updateuserStory/:userStoryId',authenticateJwtToken,async(req,res,next)=>{
    try{
        let{body:requiredColumns}=req;
        const {locals:{role,userId}}=res;
        const {params:{userStoryId}}=req;
        const result=await editUserStory(role,requiredColumns,userStoryId,userId)
        res.status(result.statusCode).send(new responseHandler(result))

    }catch(error){
        next(error)
    }
})

router.delete('/deleteuserStory/:userStoryId',authenticateJwtToken,async(req,res,next)=>{
    try{
        const {locals:{role,userId}}=res;
        const {params:{userStoryId}}=req;
        const result=await deleteuserStory(role,userId,userStoryId);
        res.status(result.statusCode).send(new responseHandler(result))
    }catch(error){
        next(error)
    }
})

