import Joi from "joi";

const insertRolesSchema = Joi.object({
    Role:Joi.string().required()
})

const updateRolesSchema = Joi.object({
    Role:Joi.string().required()
})



export default{
    insertRolesSchema,
    updateRolesSchema
}