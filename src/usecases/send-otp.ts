import { OTP } from "../domain/entities/OTP";
import type { OTPRepository } from "../domain/repositories/otp-repository";
import { sendWhatsAppOTP } from "../infra/services/wa-service";

export class SendOTP {
  constructor(private repository: OTPRepository) {}

  async execute(phoneNumber: string): Promise<void> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const otp = new OTP(phoneNumber, code, Date.now() + 5 * 60 * 1000);
    
    this.repository.save(otp);

    await sendWhatsAppOTP(phoneNumber, code);
  }
}
