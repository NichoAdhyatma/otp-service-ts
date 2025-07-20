import { Router } from "express";
import { OTPRepositoryMemory } from "../infra/in-memory/otp-repository-memory";
import { SendOTP } from "../usecases/send-otp";
import { VerifyOTP } from "../usecases/verify-otp";
import { apiKeyAuth } from "../middlewares/api-key-auth";


const router = Router();
const otpRepo = new OTPRepositoryMemory();
const sendOTP = new SendOTP(otpRepo);
const verifyOTP = new VerifyOTP(otpRepo);

router.post("/send-otp",apiKeyAuth, async (req, res) => {
 const { phoneNumber } = req.body ?? {}; 

  if (!phoneNumber) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  try {
    await sendOTP.execute(phoneNumber);
    res.status(200).json({ message: "OTP sent via WhatsApp" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

router.post("/verify-otp", apiKeyAuth, (req, res) => {
  const { phoneNumber, code } = req.body;
  if (!phoneNumber || !code) {
    return res.status(400).json({ message: "Phone number and OTP code required" });
  }

  const valid = verifyOTP.execute(phoneNumber, code);
  if (valid) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }
});

export default router;
