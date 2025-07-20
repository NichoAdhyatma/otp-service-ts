// index.ts
import dotenv from "dotenv";
import app from "./app";
import serverless from "serverless-http";

dotenv.config();

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 OTP Service running on http://localhost:${PORT}`);
  });
}

export default serverless(app);