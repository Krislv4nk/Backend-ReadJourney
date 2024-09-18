import express from "express";

import authController from "../controllers/authController.js";

import validateBody from "../helpers/validateBody.js";

import {userSignupSchema, userSigninSchema} from "./../schemas/userSchema.js";

import authenticate from "../middlewares/authenticate.js";

import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/signUp", upload.single("avatar"), validateBody(userSignupSchema), authController.signup);

authRouter.post("/signIn", validateBody(userSigninSchema), authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signOut", authenticate, authController.signout);

authRouter.patch("/subscription", authenticate, authController.updateStatus);

authRouter.patch("/avatars", authenticate, upload.single("avatar"), authController.updateAvatar);


export default authRouter;