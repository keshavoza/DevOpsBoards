import {errorMessages,successMessages} from '../../constants/resMessages.js'
import {errorStatusCodes,successStatusCodes} from '../../constants/statusCodes.js'
import {messageHandler} from '../../common/handlers.js'

const{forbiddenMessage,resourceExistsMessage,resourceNotFoundMessage
} = errorMessages

const {createdMessage,updatedMessage,deletedMessage} = successMessages

const {forbidden,notFound,conflict} = errorStatusCodes

const {ok,created} = successStatusCodes


export const RoleMessages = {
    ROLE_ALREADY_EXISTS : new messageHandler(conflict,resourceExistsMessage),
    ROLE_ADDED_SUCCESSFULLY : new messageHandler(created,createdMessage),
    UPDATE_RESTRICTED : new messageHandler(forbidden,forbiddenMessage),
    UPDATE_ROLE: new messageHandler(ok,updatedMessage),
    ROLE_NOT_FOUND: new messageHandler(notFound,resourceNotFoundMessage),
    ROLE_DELETED_SUCCESSFULLY: new messageHandler(ok,deletedMessage)
}