import { Router } from "express";

const baseRoute = Router();

baseRoute.get("/", (_, res) => {
  res.status(200).json({
    message: "OTP Service is running ✅",
    timestamp: new Date().toISOString(),
  });
});

export default baseRoute;
