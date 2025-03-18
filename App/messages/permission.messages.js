import {errorMessages,successMessages} from '../../constants/resMessages.js'
import {errorStatusCodes,successStatusCodes} from '../../constants/statusCodes.js'
import {messageHandler} from '../../common/handlers.js'

const{resourceExistsMessage,resourceNotFoundMessage} = errorMessages

const {createdMessage,updatedMessage,deletedMessage} = successMessages

const {badRequest,unauthorized,forbidden,notFound,methodNotAllowed,conflict} = errorStatusCodes

const {ok,created,accepted,noContent,notModified} = successStatusCodes

export const permissionMessages = {
    PERMISSION_ALREADY_EXISTS : new messageHandler(conflict,resourceExistsMessage),
    PERMISSION_ADDED_SUCCESSFULLY : new messageHandler(created,createdMessage),
    PERMISSION_EDITTED_SUCCESSFULLY : new messageHandler(ok,updatedMessage),
    PERMISSION_NOT_FOUND : new messageHandler(notFound,resourceNotFoundMessage),
    PERMISSION_DELETED_SUCCESSFULLY : new messageHandler(ok,deletedMessage),
}