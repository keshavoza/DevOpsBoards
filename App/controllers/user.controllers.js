import {
  generateJwtToken,
  passwordComparing,
  passwordHashing,
} from "../../common/utils.js";
import user from "../services/users.services.js";
import { newMessage } from "../messages/user.messages.js";

const { CONFLICTMESSAGE, USERSIGNUP,UNAUTHORIZED } = newMessage;

const signupUser = async (emailId, password) => {
  try {
    const checkEmailAlreadyPresent = await user.checkAlreadyPresent(emailId);
    if (checkEmailAlreadyPresent.result.length) {
      throw CONFLICTMESSAGE;
    } else {
      const encodedPassword = await passwordHashing(password);
      await user.signup(emailId, encodedPassword);
      return USERSIGNUP;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const loginUser = async (emailId, password) => {
  try {
    const userLogin = await user.login(emailId);
    if (userLogin.result.length) {
      const hashedPassword = userLogin.result[0].password;
      const isPasswordCorrect = await passwordComparing(password, hashedPassword);
      if (isPasswordCorrect) {
        const token = await generateJwtToken(userLogin.result[0]);
        return token;
      } else {
        throw UNAUTHORIZED
      }
    }
    else{
      throw UNAUTHORIZED
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  signupUser,
  loginUser,
};




