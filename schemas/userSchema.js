import Joi from "joi";

import { emailRegexp } from "../helpers/user-constants.js";


export const userSignupSchema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

export const userSigninSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    favorites: [{ type: String }],
})

export const userEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({
        'string.empty':  "missing required field email",
        'any.required': "missing required field email"
    })
})