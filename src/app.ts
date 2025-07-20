import express from "express";
import cors from "cors";
import otpRoutes from "./routes/otp";
import { requestLogger } from "./middlewares/request-logger";
import rateLimit from "express-rate-limit";

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(rateLimit);

app.use("/api", otpRoutes);

export default app;
