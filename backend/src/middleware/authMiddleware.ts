import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";
import User from "../model/userModel";

type RequestWithUser = Request & {
  user?: any;
};

const protect = AsyncHandler(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
          userId: string;
        };

        req.user = await User.findById(decoded.userId).select("-password");

        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, invalid token");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

export { protect };
