import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

type UserMethods = {
  matchPasswords: (enteredPassword: string) => Promise<boolean>;
};

type UserType = Document & {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  isGoogleUser:boolean;
  _id: mongoose.Types.ObjectId;
} & UserMethods;

const userSchema: Schema<UserType> = new Schema(
  {
    name: {
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
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isGoogleUser: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPasswords = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User: Model<UserType> = mongoose.model<UserType>("User", userSchema);

export default User;
