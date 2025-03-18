import { verifyToken } from "../common/utils.js";

import { jwtUnauthenticatedMessages } from "../App/messages/jwt.messages.js";
import { responseHandler } from "../common/handlers.js";

const {JWT_INVALID,ENTER_JWT_TOKEN} = jwtUnauthenticatedMessages

export const authenticateJwtToken = async (req,res,next)=>{
    try {
        const authHeader = req.headers['authorization']
        const result = verifyToken(authHeader)

    res.locals = result.data;
   
    if(!authHeader){
       res.status(ENTER_JWT_TOKEN.statusCode).send(new responseHandler(null,ENTER_JWT_TOKEN))
    }
    else{
        if(!result.success){
            res.status(JWT_INVALID.statusCode).send(new responseHandler(null,JWT_INVALID))
        }
        else{
            next();
        }
    }
    } catch (error) {
        throw error;
    }
    

}

