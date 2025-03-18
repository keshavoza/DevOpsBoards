import { errorMessages,successMessages } from "../../constants/resMessages.js";

import { errorStatusCodes,successStatusCodes } from "../../constants/statusCodes.js";

import { messageHandler } from "../../common/handlers.js";

const{badRequestMessage,unauthorizedMessage,forbiddenMessage,notFoundMessage,conflictMessage} = errorMessages

const {createdMessage,updatedMessage,deletedMessage,loginSuccessMessage,noContentMessage,userAddedToExistingSprint} = successMessages

const {badRequest,unauthorized,forbidden,notFound,methodNotAllowed,conflict} = errorStatusCodes

const {ok,created,accepted,noContent,notModified,successfullyFetchMessage} = successStatusCodes


export const sprintMessages={
    sprint_created:new messageHandler(created,createdMessage),

    sprint_updated:new messageHandler(ok,updatedMessage),

    sprint_deleted:new messageHandler(ok,deletedMessage),

    unauthorized:new messageHandler(unauthorized,unauthorizedMessage),

    not_found: new messageHandler(notFound,notFoundMessage),

    access_forbidden:new messageHandler(forbidden,forbiddenMessage),

    bad_request:new messageHandler(badRequest,badRequestMessage),

    no_content:new messageHandler(noContent,noContentMessage),
    
    user_added_to_sprint:new messageHandler(ok,userAddedToExistingSprint)

}

