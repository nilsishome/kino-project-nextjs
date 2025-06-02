import mongoose, {Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  id: string;
  isVerified?: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
   lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
    required: false,
  },
  verificationToken: {
    type: String,
    default: null,
    required: false,
  },
   resetPasswordToken: {
    type: String,
    required: false,
  },
  resetPasswordExpires: {
    type: Date,
    required: false,
  },
})

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;

