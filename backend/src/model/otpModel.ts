import mongoose, { Schema, Document, Model } from "mongoose";

type OtpType = Document & {
  userId: mongoose.Types.ObjectId;
  otp: string;
  expiresAt: Date;
};

const otpSchema = new Schema<OtpType>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Otp = mongoose.model<OtpType>("Otp", otpSchema);

export default Otp;
