import express from 'express';
import multer from "multer"
import attachmentsControllers from '../controllers/attachments.controllers.js';
import { authenticateJwtToken } from '../../Middlewares/jwtAuthMiddleware.js';
import { responseHandler } from '../../common/handlers.js';
import { successStatusCodes } from '../../constants/statusCodes.js';
import { attachmentMessages } from '../messages/attachment.messages.js';
import { deleteAuthorize, getAuthorize, postAuthorize } from '../../Middlewares/roles.middleware.js';
import { attachmentRoutes } from '../../constants/routes.constants.js';

const {ok} = successStatusCodes
const {GETALLATTACHMENTS,GETSPECIFICATTACHMENTS,ADDATTACHMENT,DELETEATTACHMENT} = attachmentRoutes
const {ATTACHMENT_ADDED_SUCCESSFULLY} = attachmentMessages

const fileUpload = multer()

export const router = express.Router();

router.get(GETALLATTACHMENTS,authenticateJwtToken,getAuthorize,async(req,res,next)=>{
    try {
        const {params:{taskId}} = req;
        const listAttachmentsResponse = await attachmentsControllers.getAttachments(taskId)
        res.status(ok).send(new responseHandler(listAttachmentsResponse))
    } catch (error) {
        next(error);
    }
}
)

router.get(GETSPECIFICATTACHMENTS,authenticateJwtToken,getAuthorize,async(req,res,next)=>{
    try {
        const{params:{taskId,attachmentId}} = req;
        const listSpecificAttachmentResponse = await attachmentsControllers.getSpecificAttachments(taskId,attachmentId);

        res.status(ok).send(new responseHandler(listSpecificAttachmentResponse))
    } catch (error) {
        next(error);
    }
}
)

router.post(ADDATTACHMENT, fileUpload.single("file"),authenticateJwtToken,postAuthorize,
async(req,res,next)=>{
    try {
        const {params:{taskId}} = req
        const file = req.file;
        const addAttachmentResponse =  await attachmentsControllers.addAttachments(file,taskId)
        if(addAttachmentResponse.affectedRows){
            res.status(ATTACHMENT_ADDED_SUCCESSFULLY.statusCode).send(new responseHandler(ATTACHMENT_ADDED_SUCCESSFULLY))
        }
    } catch (error) {
        next(error);
    }
}
 );

router.delete(DELETEATTACHMENT,authenticateJwtToken,deleteAuthorize,async(req,res,next)=>{
    try {
        const {params:{taskId,attachmentId}} = req;
        const deletedAttachmentResponse = await attachmentsControllers.deleteAttachments(taskId,attachmentId);

        res.status(deletedAttachmentResponse.statusCode).send(new responseHandler(deletedAttachmentResponse))
    } catch (error) {
        next(error);
    }
}
)