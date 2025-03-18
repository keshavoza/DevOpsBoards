import joi from "joi";

const createSprintSchema= joi.object({
    sprintName:joi.string().required(),
    startDate:joi.date().required(),
    endDate:joi.date().required()
});


export default{
    createSprintSchema
}