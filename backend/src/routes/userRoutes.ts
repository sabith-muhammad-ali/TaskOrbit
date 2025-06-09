import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  verifyOtp,
  resendOtp,
} from "../controllers/userController";
import googleAuth from "../controllers/googleAuthController";
import { protect } from "../middleware/authMiddleware";
import upload from "../utils/multer";

router.post("/", upload.single("image"), registerUser);
router.post("/auth", authUser);
router.post("/verify-email", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/google", googleAuth);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, upload.single("image"), updateUserProfile);

export default router;
