import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";
import { emailRegexp, passwordRegexp } from "../helpers/user-constants.js";


const userSchema = new Schema(
    { username: {
      type: String,
      required: [true, 'Name is required']
    },
      
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
          match: [ emailRegexp, 'Email must be valid' ],
        },
        token: {
          type: String,
          default: null,
    },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
         verify: {
          type: Boolean,
          default: false,
        },
        verificationToken: {
          type: String,
        },
      },
    { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveError);
userSchema.pre('findOneAndUpdate', setUpdateSettings);
userSchema.post('findOneAndUpdate', handleSaveError);

const User = model('user', userSchema);

export default User;