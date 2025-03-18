import express from "express";
import { listAllEpics,createEpic,createEpicByAdminForUser,updateEpic,updateEpicAdmin,deleteEpic,getEpicSpecificMembers } from "../controllers/epic.controllers.js";
import { authenticateJwtToken } from "../../Middlewares/jwtAuthMiddleware.js";
import { responseHandler } from "../../common/handlers.js";
import {successStatusCodes} from '../../constants/statusCodes.js'
import validators from '../validators/epics.validators.js';
import {validateBody} from '../../common/utils.js';
import { epicsRoutes } from "../../constants/routes.constants.js";

export const router = express.Router();

const {createEpicSchema,editEpicSchema}=validators
const {ok} = successStatusCodes

const {GETEPICS,GETEPICMEMBERS,ADDSPRINTBYADMIN,ADDSPRINTBYUSER,UPDATEEPICADMIN,UPDATEEPICUSER,DELETEEPIC} = epicsRoutes



router.get(GETEPICS,authenticateJwtToken,async(req,res,next)=>{
    try{

        const {locals:{userId,role}}=res;
   
        const {params:{sprintId}}=req;

        const result=await listAllEpics(userId,role,sprintId);

        res.status(ok).send(new responseHandler(result))
    }catch(error){
        next(error);
    }
});


router.get(GETEPICMEMBERS,authenticateJwtToken,async(req,res,next)=>{
    try{
        const {locals:{role,userId}}=res;
        const  {params:{epicId}}=req;
        const result=await getEpicSpecificMembers(role,userId,epicId);
        res.status(ok).send(new responseHandler(result))
    }catch(error){
        next(error)
    }
})


router.post(ADDSPRINTBYUSER,validateBody(createEpicSchema),authenticateJwtToken,async(req,res,next)=>{
    try{
      
        const {body:createEpicBody}=req;
        const {params:{sprintId}}=req;
        const {locals:{userId}}=res;

        const result=await createEpic(createEpicBody,sprintId,userId);
        
        res.status(result.statusCode).send(new responseHandler(result))
    }catch(error){
        next (error);
    }
});


router.post(ADDSPRINTBYADMIN,validateBody(createEpicSchema),authenticateJwtToken,async(req,res,next)=>{
    try{
        
        const {locals:{role}}=res;
        const {body:createEpicBody}=req;
        const {params:{sprintId}}=req;
        

        const result=await createEpicByAdminForUser(role,createEpicBody,sprintId)
        res.status(result.statusCode).send(new responseHandler(result))
    }catch(error){
        next(error);
    }
});


router.put(UPDATEEPICUSER,validateBody(editEpicSchema),authenticateJwtToken,async(req,res,next)=>{
    try{
        let{body:requiredColumns}=req;
        const{locals:{userId}}=res;
        const {params:{epicId}}=req;
        const result=await updateEpic(requiredColumns, userId, epicId)
        res.status(result.statusCode).send(new responseHandler(result))
    }catch(error){
        next(error)
    }
})


router.put(UPDATEEPICADMIN,validateBody(editEpicSchema),authenticateJwtToken,async(req,res,next)=>{
    try{
        let{body:requiredColumns}=req;
        const{locals:{role}}=res;
        const {params:{epicId}}=req;
        const result =await updateEpicAdmin(requiredColumns,role,epicId)
        res.status(result.statusCode).send(new responseHandler(result))
    }catch(error){
        next(error)
    }
})

router.delete(DELETEEPIC,authenticateJwtToken,async(req,res,next)=>{
    try{
        const {locals:{role,userId}}=res;
        const{params:{epicId}}=req;
        const result=await deleteEpic(role,userId,epicId)
        res.status(result.statusCode).send(new responseHandler(result))
    }catch(error){
        next(error)
    }
})