import  HttpError  from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import * as authServices from "../services/authServices.js";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import "dotenv/config"; 
import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";
import { nanoid } from "nanoid";
import sendEmail from "../helpers/sendEmail.js";

const {JWT_SECRET,BASE_URL} = process.env;

const avatarPath = path.resolve("public", "avatars");
 const signup = async(req, res )=> {
    const {email} = req.body;
    const avatarURL = gravatar.url(email);
    const user = await authServices.findUser({email});
    if (user) {
        throw HttpError(409, "Email in use");
    }
    const verificationToken = nanoid();
    const newUser = await authServices.signup({...req.body, avatarURL, verificationToken});
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank">Click to verify</a>`
    };

    await sendEmail(verifyEmail);
    
    res.status(201).json({user:{
    email: newUser.email,
    subscription: newUser.subscription, avatarURL
  }});
}  

const signin = async(req, res )=> {
    const {email, password} = req.body;
    const user = await authServices.findUser({email});
    if(!user) {
        throw HttpError(401, "Email or password is wrong");
    }
    if (!user.verify) {
        throw HttpError(401, "Email not verified");
    }
    const comparePassword = await authServices.validatePassword(password, user.password);
    if(!comparePassword) {
        throw HttpError(401, "Email or password is wrong");
    }
    const {_id: id} = user;
    const payload = {id, email};
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});

    await authServices.updateUser({_id: id}, {token});

    res.json({token, user: { email, subscription: user.subscription}});
}

const verify = async(req, res )=> {
const {verificationToken} = req.params;
const user = await authServices.findUser({verificationToken});
if(!user) {
    throw HttpError(404, "User not found");
}
await authServices.updateUser({_id: user._id}, {verify: true, verificationToken: null});
res.status(200).json({message: "Verification successful"});
}

const resendVerifyEmail = async(req, res )=> {
const {email} = req.body;
const user = await authServices.findUser({email});
if(!user) {
    throw HttpError(404, "User not found");
}
if(user.verify) {
    throw HttpError(400, "Verification has already been passed");
}
const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/users/verify/${user.verificationToken}" target="_blank">Click to verify</a>`
};

await sendEmail(verifyEmail);
res.status(200).json({message: "Verification email sent"});
}

const getCurrent = async(req, res)=> {
    const {username, email} = req.user;

    res.json({
        username,
        email, subscription: req.user.subscription
    })
}

const signout = async(req, res)=> {
    const {_id: id} = req.user;
    await authServices.updateUser({_id: id}, {token: ""});
    res.status(204).json({message: "No Content"});
}

const updateStatus = async(req, res)=> {
    const {subscription} = req.user;
    const {_id: id} = req.user;
    await authServices.updateUser({_id: id}, {subscription});
    res.status(200).json({subscription});
}

const updateAvatar = async(req, res)=> {
    const {_id: id} = req.user;
    if (!req.file) {
        return res.status(400).json({message: 'File not found, please add file'});
    }
    const {path: tempUpload, originalname} = req.file;
    const image = await Jimp.read(tempUpload);
    image.resize(250, 250).write(tempUpload);
    const filename = `${id}_${originalname}`;
    const upload = path.join(avatarPath, filename);
    await fs.rename(tempUpload, upload);
    const avatarURL = path.join("avatars", filename);
    await authServices.updateUser({_id: id}, {avatarURL});
    res.json({avatarURL});
}

export default {
    signup: ctrlWrapper(signup),
    verify: ctrlWrapper(verify),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
    updateStatus: ctrlWrapper(updateStatus),
    updateAvatar: ctrlWrapper(updateAvatar),
};