import { Router } from "express";
import { apiKeyAuth } from "../middlewares/api-key-auth";
import {
  sendOTPController,
  verifyOTPController,
} from "../controllers/otp-controller";

const otpRouter = Router();

otpRouter.post("/send-otp", apiKeyAuth, sendOTPController);
otpRouter.post("/verify-otp", apiKeyAuth, verifyOTPController);

export default otpRouter;
