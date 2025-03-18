import {errorMessages,successMessages} from '../../constants/resMessages.js'
import {errorStatusCodes,successStatusCodes} from '../../constants/statusCodes.js'
import {messageHandler} from '../../common/handlers.js'


const{badRequestMessage,unauthorizedMessage,forbiddenMessage,notFoundMessage,conflictMessage,epicNotFound,sprintNotFound} = errorMessages

const {createdMessage,updatedMessage,deletedMessage,loginSuccessMessage,noContentMessage,userAddedToABoard} = successMessages

const {badRequest,unauthorized,forbidden,notFound,methodNotAllowed,conflict} = errorStatusCodes

const {ok,created,accepted,noContent,notModified,successfullyFetchMessage} = successStatusCodes


export const epicMessages = {
    conflict_message : new messageHandler(conflict,conflictMessage),
    epic_created: new messageHandler(created, createdMessage),
    epic_updated: new messageHandler(ok, updatedMessage),
    epic_deleted: new messageHandler(ok,deletedMessage),
    unauthorized: new messageHandler(unauthorized, unauthorizedMessage),
    epic_fetched: new messageHandler(ok,successfullyFetchMessage),
    not_found:new messageHandler(notFound,notFoundMessage),
    access_forbidden:new messageHandler(forbidden,forbiddenMessage),
    bad_request:new messageHandler(badRequest,badRequestMessage),
    no_content:new messageHandler(noContent,noContentMessage),
    epic_not_found:new messageHandler(notFound,epicNotFound),
    sprint_not_found:new messageHandler(notFound,sprintNotFound)
    
}
