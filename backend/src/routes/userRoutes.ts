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
import { protect } from "../middleware/authMiddleware";

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/verify-email", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
