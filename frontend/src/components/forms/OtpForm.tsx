import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useVerifyOtpMutation } from "@/slices/UserApiSlice";
import { toast } from "react-toastify";
import type { RootState } from "../../store";

const OtpForm = () => {
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate()

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setError("");
    console.log("Entered OTP:", otp);

    try {
      await verifyOtp({ email: userInfo.email, otp }).unwrap();
      toast.success("OTP verified successfully!");
      navigate("/")
    } catch (err: any) {
      toast.error(err?.data?.message || "OTP verification failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-pink-400 rounded-lg p-6 shadow-sm bg-white w-full"
    >
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-black">Enter OTP</h1>
        <p className="text-sm text-muted-foreground">
          Please enter the 6-digit code sent to your email
        </p>
      </div>

      <div className="flex justify-center mb-2">
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={(value: string) => setOtp(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      <Button type="submit" className="w-full cursor-pointer">
        Verify OTP
      </Button>
    </form>
  );
};

export default OtpForm;
