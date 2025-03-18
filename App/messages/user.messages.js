import {errorMessages,successMessages} from '../../constants/resMessages.js'
import {errorStatusCodes,successStatusCodes} from '../../constants/statusCodes.js'
import {messageHandler} from '../../common/handlers.js'

const{unauthorizedMessage,conflictMessage} = errorMessages

const {createdMessage} = successMessages

const {unauthorized,conflict} = errorStatusCodes

const {created} = successStatusCodes

export const newMessage = {
    CONFLICTMESSAGE : new messageHandler(conflict,conflictMessage),
    USERSIGNUP: new messageHandler(created, createdMessage),
    UNAUTHORIZED: new messageHandler(unauthorized, unauthorizedMessage)
}
