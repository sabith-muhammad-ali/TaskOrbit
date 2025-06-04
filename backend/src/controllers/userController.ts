import AsyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken";
import { Request, Response } from "express";
import User from "../model/userModel";
import Otp from "../model/otpModel";
import crypto from "crypto";
import sendOtp from "../utils/sendMail";

const authUser = AsyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    generateToken(res, user._id.toString());
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

const registerUser = AsyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    isVerified: false,
  });

  const otp = crypto.randomInt(100000, 999999).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  const newOtp = new Otp({
    userId: user._id,
    otp,
    expiresAt,
  });

  await newOtp.save();

  await sendOtp(email, otp);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const verifyOtp = AsyncHandler(async (req: Request, res: Response) => {
  console.log("req.body:", req.body);
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const otpDoc = await Otp.findOne({ userId: user._id });
  console.log(otpDoc);

  if (!otpDoc) {
    res.status(400);
    throw new Error("OTP not found");
  }

  const isExpired = otpDoc.expiresAt.getTime() < Date.now();
  if (otpDoc.otp !== otp || isExpired) {
    res.status(400);
    throw new Error("Invalid or expired OTP");
  }

  user.isVerified = true;
  await user.save();

  await Otp.deleteMany({ userId: user._id });

  generateToken(res, user._id.toString());
  res.status(200).json({ message: "OTP verified successfully" });
});

const resendOtp = AsyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (user.isVerified) {
    res.status(400);
    throw new Error("User is already verified");
  }

  await Otp.deleteMany({ userId: user._id });

  const otp = crypto.randomInt(100000, 999999).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  const newOtp = new Otp({
    userId: user._id,
    otp,
    expiresAt,
  });

  await newOtp.save();

  await sendOtp(email, otp);

  res.status(200).json({ message: "OTP resent successfully" });
});

const logoutUser = AsyncHandler(async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

const getUserProfile = AsyncHandler(async (req: Request, res: Response) => {
  const user = {
    _id: (req as any).user._id as string,
    name: (req as any).user.name as string,
    email: (req as any).user.email as string,
  };
  res.status(200).json(user);
});

const updateUserProfile = AsyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id as string;
  const user = await User.findById(userId);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  verifyOtp,
  resendOtp,
  getUserProfile,
  updateUserProfile,
  logoutUser,
};
