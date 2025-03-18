import { errorMessages,successMessages } from "../../constants/resMessages.js";

import { errorStatusCodes,successStatusCodes } from "../../constants/statusCodes.js";

import { messageHandler } from "../../common/handlers.js";

const{badRequestMessage,unauthorizedMessage,forbiddenMessage,notFoundMessage,conflictMessage} = errorMessages

const {createdMessage,updatedMessage,deletedMessage,loginSuccessMessage,noContentMessage,userAddedToExistingUserStory} = successMessages

const {badRequest,unauthorized,forbidden,notFound,methodNotAllowed,conflict} = errorStatusCodes

const {ok,created,accepted,noContent,notModified,successfullyFetchMessage} = successStatusCodes


export const userStoryMessages={
    user_story_created:new messageHandler(created,createdMessage),
    user_story_updated:new messageHandler(ok,updatedMessage),
    user_story_deleted:new messageHandler(ok,deletedMessage),
    unauthorized: new messageHandler(unauthorized, unauthorizedMessage),
    not_found:new messageHandler(notFound,notFoundMessage),
    access_forbidden:new messageHandler(forbidden,forbiddenMessage),
    no_content:new messageHandler(noContent,noContentMessage),
    user_added_to_user_story:new messageHandler(ok,userAddedToExistingUserStory)


}