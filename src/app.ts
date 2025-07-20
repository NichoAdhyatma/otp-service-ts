import express from "express";
import cors from "cors";
import { limiter } from "./presentation/middlewares/rate-limiter";
import { requestLogger } from "./presentation/middlewares/request-logger";
import otpRouter from "./presentation/routes/otp-routes";
import baseRoute from "./presentation/routes/base-routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(limiter);

app.use((req, res, next) => {
  console.log(`[DEBUG] ${req.method} ${req.url}`);
  next();
});


app.use("/api", otpRouter);

app.use("/", baseRoute);

export default app;
