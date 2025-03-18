import {errorMessages,successMessages} from '../../constants/resMessages.js'
import {errorStatusCodes,successStatusCodes} from '../../constants/statusCodes.js'
import {messageHandler} from '../../common/handlers.js'


const{badRequestMessage,unauthorizedMessage,forbiddenMessage,notFoundMessage,conflictMessage,boardNotFound} = errorMessages

const {createdMessage,updatedMessage,deletedMessage,loginSuccessMessage,noContentMessage,userAddedToABoard} = successMessages

const {badRequest,unauthorized,forbidden,notFound,methodNotAllowed,conflict} = errorStatusCodes

const {ok,created,accepted,noContent,notModified,successfullyFetchMessage} = successStatusCodes


export const boardsMessages = {
    conflict_message : new messageHandler(conflict,conflictMessage),
    board_created: new messageHandler(created, createdMessage),
    board_updated: new messageHandler(ok, updatedMessage),
    board_deleted: new messageHandler(ok,deletedMessage),
    unauthorized: new messageHandler(unauthorized, unauthorizedMessage),
    board_fetched: new messageHandler(ok,successfullyFetchMessage),
    not_found:new messageHandler(notFound,notFoundMessage),
    access_forbidden:new messageHandler(forbidden,forbiddenMessage),
    bad_request:new messageHandler(badRequest,badRequestMessage),
    no_content:new messageHandler(noContent,noContentMessage),
    user_added_to_existing_board:new messageHandler(ok,userAddedToABoard),
    board_not_found:new messageHandler(notFound,boardNotFound)
    
}

