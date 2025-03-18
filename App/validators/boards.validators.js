import Joi from "joi";



const createBoardSchema = Joi.object({
    title: Joi.string().required(),
    state: Joi.string()
        .valid('To do', 'Doing', 'Done')
        .alter({
            trimAndLower: schema => schema.trim().lowercase()
        })
        .required(),
    type: Joi.string()
        .valid('Epic')
        .alter({
            trimAndLower: schema => schema.trim().lowercase()
        })
        .required(),
    assignedTo: Joi.string().email()
});


const editBoardSchema = Joi.object({
    title: Joi.string(),
    state: Joi.string()
        .valid('To do', 'Doing', 'Done')
        .alter({
            trimAndLower: schema => schema.trim().lowercase()
        }),
    type: Joi.string()
        .valid('Epic')
        .alter({
            trimAndLower: schema => schema.trim().lowercase()
        }),
    assignedTo:Joi.string().email()
})

export default {
    createBoardSchema,
    editBoardSchema
}
