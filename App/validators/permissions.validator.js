import Joi from "joi";

const addPermissionSchema = Joi.object({
    permission:Joi.string().required()
})

const editPermission = Joi.object({
    permission:Joi.string().required()
})


export default{
    addPermissionSchema,
    editPermission
}