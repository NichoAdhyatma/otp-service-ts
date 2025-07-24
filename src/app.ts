import express from "express";
import cors from "cors";
import { requestLogger } from "./presentation/middlewares/request-logger";
import otpRouter from "./presentation/routes/otp-routes";
import baseRoute from "./presentation/routes/base-routes";
import { rateLimiter } from "./presentation/middlewares/rate-limiter";

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(rateLimiter);

app.use("/api", otpRouter);

app.use("/", baseRoute);

export default app;
