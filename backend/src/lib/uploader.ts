 import cloudinary from "../config/cloudinary";
 import path from "path";
 import { logger } from "./logger";

  const imageUploader= async(fileBuffer:Buffer,fileName:string,fileType:string)=>{
   try{
      if(!fileBuffer){
       return
    }
    const fileBufferBase64 =`data:${fileType};base64,${fileBuffer.toString('base64')}`;
    const result = await cloudinary.uploader.upload(fileBufferBase64, {
      resource_type: "image",
      folder: "tourism",
      public_id:`post-${fileName}-${Date.now()}`,
      transformation: {
        quality: "auto",
        fetch_format: "auto",
      },
    });
    logger.info({
        message: "File uploaded successfully",
        publicId: result.public_id,
      });
      return result;
      }catch(err){
        logger.error({
          message: "Error uploading file",
          error: err,
        });
        return null;
      }
 }
 export default imageUploader