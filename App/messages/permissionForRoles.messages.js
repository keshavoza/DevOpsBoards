import {errorMessages,successMessages} from '../../constants/resMessages.js'
import {errorStatusCodes,successStatusCodes} from '../../constants/statusCodes.js'
import {messageHandler} from '../../common/handlers.js'

const{resourceExistsMessage,resourceNotFoundMessage} = errorMessages

const {createdMessage,deletedMessage} = successMessages

const {notFound,conflict} = errorStatusCodes

const {ok} = successStatusCodes

export const permissionForRolesMessages = {
    PERMISSION_FOR_ROLE_ALREADY_PRESENT : new messageHandler(conflict,resourceExistsMessage),
    PERMISSION_FOR_ROLE_ADDED_SUCCESSFULLY : new messageHandler(ok,createdMessage),
    PERMISSION_OR_ROLE_NOT_PRESENT : new messageHandler(notFound,resourceNotFoundMessage),
    PERMISSION_FOR_ROLE_DELETED_SUCCESSFULLY : new messageHandler(ok,deletedMessage)

}