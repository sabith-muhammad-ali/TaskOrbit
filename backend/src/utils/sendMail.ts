import nodemailer from "nodemailer";
import { getOtpEmailTemplate } from "./otpEmailTemplate";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendOtp = async (email: string, otp: string) => {
  const mailOptions = {
    from: process.env.EMIL_USER,
    to: email,
    subject: "Verify Your Email - OTP Code",
    html: getOtpEmailTemplate(otp),
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully");
  } catch (err) {
    console.log("error sending OTP email: ", err);
    throw new Error("Faild to send OTP Email");
  }
};

export default sendOtp;
