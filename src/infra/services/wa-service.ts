
import FormData from "form-data";
import { fonnteClient } from "../../config/axios";

export async function sendWhatsAppOTP(phoneNumber: string, otp: string): Promise<void> {
  const message = `Kode OTP kamu adalah *${otp}*. Berlaku 5 menit.`;

  const form = new FormData();
  form.append("target", phoneNumber);
  form.append("message", message);
  form.append("countryCode", "62");

  try {
    const response = await fonnteClient.post("/send", form, {
      headers: form.getHeaders(),
    });

    const { status, reason } = response.data;

    if (!status) {
      console.error("❌ Gagal kirim OTP ke WA", response.data);
      throw new Error(reason || "WhatsApp send failed");
    }

    console.log(`📨 OTP terkirim ke WhatsApp ${phoneNumber}`);
  } catch (error: any) {
    console.error("❌ WhatsApp Error:", error.message);
    throw error;
  }
}
