import streamifier from "streamifier";
import { v2 as cloudinary } from "cloudinary";
import attachmentsServices from "../services/attachments.services.js";
import { attachmentMessages } from "../messages/attachment.messages.js";


const { ATTACHMENT_DELETED_SUCCESSFULLY,
  ATTACHMENT_NOT_FOUND } = attachmentMessages;

  
const addAttachments = async (file,taskId) => {
  try {
    console.log(taskId);
    const streamUpload = async(file) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

         streamifier.createReadStream(file.buffer).pipe(stream);
      })
    
    };

    async function upload(file,taskId) {
      const result = await streamUpload(file);
      const Url = result.secure_url;

      const addAttachmentResult = await attachmentsServices.addAttachments(taskId, Url);
      if(addAttachmentResult.result.affectedRows){
        return addAttachmentResult.result
      }
      else{
        throw error;
      }
      
    }
    const uploadResult = await upload(file,taskId);
    return uploadResult;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAttachments = async (taskId) => {
  try {
    const getAttachmentsResult = await attachmentsServices.getAttachments(
      taskId
    );
    return getAttachmentsResult.result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getSpecificAttachments = async (taskId,attachmentId) => {
  try {
    const getSpecificAttachmentsResult =
      await attachmentsServices.getSpecificAttachments(taskId, attachmentId);

    return getSpecificAttachmentsResult.result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteAttachments = async (taskId,attachmentId) => {
  try {
  
    const getSpecificAttachments = await attachmentsServices.getSpecificAttachments(taskId,attachmentId)
  
    if(getSpecificAttachments.result.length){
      await attachmentsServices.deleteAttachments(
        taskId,
        attachmentId
      );
      return ATTACHMENT_DELETED_SUCCESSFULLY;
    }
    else{
      throw ATTACHMENT_NOT_FOUND
    }
  
  } catch (error) {
    throw error;
  }
  
};

export default {
  addAttachments,
  getAttachments,
  getSpecificAttachments,
  deleteAttachments,
};
