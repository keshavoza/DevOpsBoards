
import Joi from 'joi';

const createEpicSchema = Joi.object({
    epicName: Joi.string().required(),
    assignedTo: Joi.string().email(),
    description: Joi.string(),
    startDate: Joi.date().required(),
    targetDate: Joi.date().required(),
    state: Joi.string()
        .valid('To do', 'Doing', 'Done')
        .alter({
            trimAndLower: schema => schema.trim().lowercase()
        })
        .required(),
});

const editEpicSchema=Joi.object({
    epicName:Joi.string().required(),
    assignedTo:Joi.string().email(),
    description:Joi.string(),
    startDate:Joi.date(),
    targetDate: Joi.date(),
    state:Joi.string()
    .valid('To do', 'Doing', 'Done')
    .alter({
        trimAndLower: schema => schema.trim().lowercase()
    })

});


export default{
    createEpicSchema,
    editEpicSchema
}