import {errorMessages,successMessages} from '../../constants/resMessages.js'
import {errorStatusCodes,successStatusCodes} from '../../constants/statusCodes.js'
import {messageHandler} from '../../common/handlers.js'

const{unauthenticatedJwtToken,jwtInvalid} = errorMessages


const {unauthorized} = errorStatusCodes

export const jwtUnauthenticatedMessages = {
    ENTER_JWT_TOKEN : new messageHandler(unauthorized,unauthenticatedJwtToken),
    JWT_INVALID : new messageHandler(unauthorized,jwtInvalid)
}