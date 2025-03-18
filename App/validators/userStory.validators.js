import Joi from 'joi';

createUserStorySchema=Joi.object({
    taskName:Joi.string().required(),
    description:Joi.string(),
    state:Joi.string()
    .valid('To do', 'In Progress', 'Done')
    .alter({
        trimAndLower: schema => schema.trim().lowercase()
    })
    .required(),
    assignedTo:Joi.string()
    .valid
});