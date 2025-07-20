import express from "express";
import cors from "cors";
import otpRoutes from "./routes/otp";
import { requestLogger } from "./middlewares/request-logger";
import { limiter } from "./middlewares/rate-limiter";


const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(limiter);



app.use("/api", otpRoutes);

export default app;
