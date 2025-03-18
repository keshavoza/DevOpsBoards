import {errorMessages,successMessages} from '../../constants/resMessages.js'
import {errorStatusCodes,successStatusCodes} from '../../constants/statusCodes.js'
import {messageHandler} from '../../common/handlers.js'

const{resourceExistsMessage,resourceNotFoundMessage} = errorMessages

const {createdMessage,updatedMessage,deletedMessage} = successMessages

const {badRequest,unauthorized,forbidden,notFound,methodNotAllowed,conflict} = errorStatusCodes

const {ok,created,accepted,noContent,notModified} = successStatusCodes


export const attachmentMessages = {
    ATTACHMENT_ADDED_SUCCESSFULLY : new messageHandler(created,createdMessage),
    ATTACHMENT_DELETED_SUCCESSFULLY : new messageHandler(ok,deletedMessage),
    ATTACHMENT_NOT_FOUND : new messageHandler(notFound,resourceNotFoundMessage),
}