import  HttpError  from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import * as authServices from "../services/authServices.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { nanoid } from "nanoid";
import sendEmail from "../helpers/sendEmail.js";


const {JWT_SECRET,BASE_URL, JWT_REFRESH_SECRET, FRONTEND_BASE_URL} = process.env;



 const signup = async(req, res )=> {
    const {email} = req.body;
    const user = await authServices.findUser({email});
    if (user) {
        throw HttpError(409, "Email in use");
    }
   const verificationToken = nanoid();
    const newUser = await authServices.signup({...req.body, verificationToken});
    const verifyEmail = {
      to: email,
      subject: "Confirm Your Email Address",
      html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
              <h2>Welcome to ReadJourney!</h2>
              <p>Thank you for registering. To complete your registration and gain access to all features, please confirm your email address.</p>
              <a href="${BASE_URL}/users/verify/${verificationToken}" target="_blank" style="
                  display: inline-block;
                  padding: 10px 20px;
                  color: #fff;
                  background-color: #007bff;
                  text-decoration: none;
                  border-radius: 5px;
                  font-weight: bold;
              ">Confirm Email Address</a>
              <p>If you did not sign up on our website, please ignore this email.</p>
              <p>Best regards, <br>Support Team</p>
          </div>
      `
  };
  

    await sendEmail(verifyEmail);
    
   res.status(201).json({
     user: {
      username: newUser.username,
      email: newUser.email,
      subscription: newUser.subscription,
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

   const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: "7d"});
  await authServices.updateUser({_id: id}, {token, refreshToken});

  res.json({token, refreshToken, user: { email, subscription: user.subscription}});
}

const verify = async(req, res )=> {
const {verificationToken} = req.params;
const user = await authServices.findUser({verificationToken});
if(!user) {
    throw HttpError(404, "User not found");
}
await authServices.updateUser({_id: user._id}, {verify: true, verificationToken: null});
res.redirect(`${FRONTEND_BASE_URL}/users/verify/${verificationToken}`);
// res.status(200).json({message: "Verification successful"});
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
  subject: "Verify Your Email Address",
  html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Welcome back to ReadJourney!</h2>
          <p>We noticed you requested another confirmation email. Please click the button below to confirm your email address and complete your registration.</p>
          <a href="${BASE_URL}/users/verify/${user.verificationToken}" target="_blank" style="
              display: inline-block;
              padding: 10px 20px;
              color: #fff;
              background-color: #007bff;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
          ">Confirm Email Address</a>
          <p>If you did not request this, please ignore this email.</p>
          <p>Best regards, <br>Support Team</p>
      </div>
  `
}

await sendEmail(verifyEmail);
res.status(200).json({message: "Verification email sent"});
}

const getCurrent = async(req, res)=> {
    const {username, email} = req.user;

    res.json({
        username,
        email,
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
    await authServices.updateUser({_id: id});
    res.status(200).json({subscription});
}

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Missing required field email" });
  }

  const user = await user.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found or email is wrong!!!");
  }

  const nanoid = customAlphabet("1234567890qwertyuiopasdfghjklzxcvbnm", 16);
  const passwordResetToken = nanoid();

  user.passwordResetToken = passwordResetToken;
  await user.save();

  const passwordResetLink = `"https://${BASE_URL}/read-jorney-frontend/forgot-password/${passwordResetToken}"`;

  const toEmail = {
    to: email,
    subject: "Restore Password",
    html: `We received a request to reset your password for your WaterTracker account. Your password reset link: ${passwordResetLink}`,
  };

  await sendEmail(toEmail);

  res.status(200).json({
    message: `Message sent to email: ${email}`,
  });
};

const recoverPassword = async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) {
    return res.status(400).json({ message: "Bad request" });
  }

  const user = await User.findOne({ passwordResetToken: token });
  if (!user) {
    return res.status(400).json({ message: "Bad request" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.passwordResetToken = null;

  await user.save();

  res.status(200).json({
    message: `Password changed to: ${user.email}`,
  });
};


const refreshToken = async (req, res) => {
  const { refreshToken: token } = req.body;

  if (!token) {
    throw HttpError(401, "No token provided");
  }
  const user = await authServices.findUser({ refreshToken: token });
  if (!user) {
    throw HttpError(403, "Forbidden");
  }

  try {
    const payload = jwt.verify(token, JWT_REFRESH_SECRET);
    const { id, email } = payload;
    const accessToken = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: "23h" });
    const newRefreshToken = jwt.sign({ id, email }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
    await authServices.updateUser({ _id: id }, { refreshToken: newRefreshToken });

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });

  } catch (error) {
    throw HttpError(403, "Invalid token");
  }
};

export default {
    signup: ctrlWrapper(signup),
    verify: ctrlWrapper(verify),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
    updateStatus: ctrlWrapper(updateStatus),
     forgotPassword: ctrlWrapper(forgotPassword),
  recoverPassword: ctrlWrapper(recoverPassword),
  refreshToken: ctrlWrapper(refreshToken),
};