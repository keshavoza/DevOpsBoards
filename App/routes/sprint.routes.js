import express from "express";

import{listAllSprints,adminSpecificSprint,createSprint,deleteSprint,addAuserToAExistingSprint,createSprintByAdmin, editSprint,getMembersofSpecificSprint} from "../controllers/sprints.controllers.js"

import { authenticateJwtToken} from "../../Middlewares/jwtAuthMiddleware.js";

export const router =express.Router();

import { successStatusCodes } from "../../constants/statusCodes.js";

const {ok} = successStatusCodes

import { responseHandler } from "../../common/handlers.js";
import validators from '../validators/sprint.validators.js';
import {validateBody} from '../../common/utils.js';



const {createSprintSchema}=validators


router.get('/boardId/:boardId',authenticateJwtToken,async(req,res,next)=>{
    try{
        const {locals:{userId,role}}=res;
        const {params:{boardId}}=req;

        const result=await listAllSprints(boardId,userId,role);

        res.status(ok).send(new responseHandler(result))
    }catch(error){
        next(error);
    }
});

router.get('/getMembersOfSprint/sprintId/:sprintId',authenticateJwtToken,async(req,res,next)=>{
    try{
        const {locals:{role,userId}}=res;
        const {params:{sprintId}}=req;

        const result=await getMembersofSpecificSprint(role,userId,sprintId)
        res.status(ok).send(new responseHandler(result))
    }catch(error){
        next(error);
    }
});


router.get('/:boardId/sprints/:sprintId',authenticateJwtToken,async(req,res,next)=>{
    try{
        const {locals:{role}}=res;
        const {params:{boardId,sprintId}}=req;
  
        const result=await adminSpecificSprint(role,boardId,sprintId);
        res.status(ok).send(new responseHandler(result))
    }
    catch(error){
        next (error);
    }
});

router.post('/:boardId/sprints', validateBody(createSprintSchema),authenticateJwtToken, async (req, res, next) => {
    try {
       
        const {body:createSprintBody,params:{boardId}} = req
        

        const {locals:{userId}} = res;
        
    
        const result = await createSprint(createSprintBody, userId,boardId);
        res.status(result.statusCode).send(new responseHandler(result))
    } catch (error) {
        next(error);
    }
});

router.post('/adduserToExistingSprint/:userId/:sprintId',authenticateJwtToken,async(req,res,next)=>{
    try{
        const {locals:{role}}=res;
        const {params:{userId,sprintId}}=req;
  
     
        const result=await addAuserToAExistingSprint(role,userId,sprintId);
        res.status(result.statusCode).send(new responseHandler(result))

    }catch(error){
        next(error);
    }
});

router.post('/createSprintByAdmin/:Id/:boardId',authenticateJwtToken,async(req,res,next)=>{
    try{

        const {body:createSprintBody}=req;
        const {locals:{role}}=res;
        const {params:{Id,boardId}}=req;

        const result=await createSprintByAdmin(role,Id,boardId,createSprintBody)
        res.status(result.statusCode).send(new responseHandler(result))
    }catch(error){
        next(error);
    }
})

router.put('/editSprint/:sprintId',authenticateJwtToken,async(req,res,next)=>{
    try{
        const{locals:{role}}=res;
        const {body:requiredColumns}=req;
        
        const {params:{sprintId}}=req
        const result=await editSprint(role,requiredColumns,sprintId)
        res.status(result.statusCode).send(new responseHandler(result))
    }catch(error){
        next(error)
    }
})



router.delete('/:sprintId/sprints/:boardId',authenticateJwtToken,async(req,res,next)=>{
    try{
        
        const {locals:{role,userId}}=res;
       
        const {params:{boardId,sprintId}}=req;
        const result= await deleteSprint(role,userId,boardId,sprintId)
        res.status(result.statusCode).send(new responseHandler(result))
    }catch(error){
        next (error);
    }
})


