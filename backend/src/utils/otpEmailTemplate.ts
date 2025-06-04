export const getOtpEmailTemplate = (otp: string): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="text-align: center; color: #4CAF50;">Email Verification</h2>
      <p>Hi there,</p>
      <p>Thank you for registering. Please use the following One-Time Password (OTP) to verify your email address:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; font-size: 24px; letter-spacing: 4px; border-radius: 5px;">
          ${otp}
        </span>
      </div>
      <p>This OTP is valid for the next <strong>10 minutes</strong>. If you did not request this, please ignore this email.</p>
      <p>Best regards,<br/>Your App Team</p>
    </div>
  `;
};