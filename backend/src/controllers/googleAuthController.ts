import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import generateToken from "../utils/generateToken";
import User from "../model/userModel";

const googleAuth = AsyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body;

  const decoded: any = jwt.decode(token, { complete: true });

  if (!decoded || !decoded.payload) {
    res.status(400);
    throw new Error("Invalid Google token");
  }

  const { email, name, picture, aud } = decoded.payload;

  if (aud !== process.env.GOOGLE_CLIENT_ID) {
    res.status(400);
    throw new Error("Invalid audience");
  }

  let user = await User.findOne({ email });

  if (!user) {
    const randomPassword = Math.random().toString(36).slice(-8);
    user = await User.create({
      name,
      email,
      password: randomPassword,
      isVerified: true,
      isGoogleUser: true,
    });
  }

  generateToken(res, user._id.toString());

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isVerified: user.isVerified,
  });
});

export default googleAuth;
