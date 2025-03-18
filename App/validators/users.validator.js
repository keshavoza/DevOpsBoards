import Joi from "joi";

const signupSchema = Joi.object({
  emailId: Joi.string().required().email(),
  password: Joi.string().required().min(6),
});

const loginSchema = Joi.object({
  emailId: Joi.string().required().email(),
  password: Joi.string().required(),
});




export default {
  signupSchema,
  loginSchema,
};
