import express from "express";

import authController from "../controllers/authController.js";

import validateBody from "../helpers/validateBody.js";

import {userSignupSchema, userSigninSchema, userEmailSchema} from "./../schemas/userSchema.js";

import authenticate from "../middlewares/authenticate.js";

import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/signUp", upload.single("avatar"), validateBody(userSignupSchema), authController.signup);

authRouter.get("/verify/:verificationToken", authController.verify);

authRouter.post("/verify", validateBody(userEmailSchema), authController.resendVerifyEmail);

authRouter.post("/signIn", validateBody(userSigninSchema), authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signOut", authenticate, authController.signout);

authRouter.patch("/subscription", authenticate, authController.updateStatus);


export default authRouter;