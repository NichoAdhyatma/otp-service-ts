import type { Request, Response } from "express";
import { FonnteWhatsAppService } from "../../data/whatsapp/fonnte-whatsapp-service";
import { OTPRepositoryMemory } from "../../data/database/in-memory/otp-repository-memory";
import { SendOTP } from "../../domain/usecases/send-otp";
import { VerifyOTP } from "../../domain/usecases/verify-otp";

// repo
const otpRepository = new OTPRepositoryMemory();
const whatsappService = new FonnteWhatsAppService();

//usecase
const sendOTP = new SendOTP(otpRepository, whatsappService);
const verifyOTP = new VerifyOTP(otpRepository);

export const sendOTPController = async (req: Request, res: Response) => {
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
};

export const verifyOTPController = (req: Request, res: Response) => {
  const { phoneNumber, code } = req.body;

  if (!phoneNumber || !code) {
    return res
      .status(400)
      .json({ message: "Phone number and OTP code required" });
  }

  const valid = verifyOTP.execute(phoneNumber, code);
  if (valid) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }
};
