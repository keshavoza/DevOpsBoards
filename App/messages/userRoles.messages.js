import {errorMessages,successMessages} from '../../constants/resMessages.js'
import {errorStatusCodes,successStatusCodes} from '../../constants/statusCodes.js'
import {messageHandler} from '../../common/handlers.js'

const{badRequestMessage,unauthorizedMessage,forbiddenMessage,notFoundMessage,conflictMessage,resourceExistsMessage,resourceNotFoundMessage} = errorMessages

const {createdMessage,updatedMessage,deletedMessage,loginSuccessMessage,successfullyFetchMessage} = successMessages

const {badRequest,unauthorized,forbidden,notFound,methodNotAllowed,conflict} = errorStatusCodes

const {ok,created,accepted,noContent,notModified} = successStatusCodes

export const userRoleMessages = {
    ROLE_OF_USER_DELETED_SUCCESSFULLY : new messageHandler(ok,deletedMessage),
    ROLE_OF_USER_NOT_FOUND : new messageHandler(noContent,resourceNotFoundMessage),
    ROLE_OF_USER_ALREADY_EXISTS : new messageHandler(conflict,resourceExistsMessage),
    ROLE_OF_USER_ADDED_SUCCESSFULLY: new messageHandler(ok,createdMessage),
    
}