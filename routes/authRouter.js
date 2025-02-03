import express from "express";

import authController from "../controllers/authController.js";

import validateBody from "../helpers/validateBody.js";

import {userSignupSchema, userSigninSchema, userEmailSchema, recoverPasswordSchema, refreshTokenSchema} from "./../schemas/userSchema.js";

import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/signup", validateBody(userSignupSchema), authController.signup);

authRouter.get("/verify/:verificationToken", authController.verify);

authRouter.post("/verify", validateBody(userEmailSchema), authController.resendVerifyEmail);

authRouter.post("/signin", validateBody(userSigninSchema), authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signOut", authenticate, authController.signout);

authRouter.post("/forgot-password", validateBody(userEmailSchema), authController.forgotPassword);

authRouter.post("/recover-password", validateBody(recoverPasswordSchema), authController.recoverPassword);

authRouter.post("/refresh", validateBody(refreshTokenSchema), authController.refreshToken);


export default authRouter;