import { OTP } from "../entities/OTP";
import type { OTPRepository } from "../repositories/otp-repository";
import type { WhatsAppService } from "../repositories/whatsapp-gateway-repository";

export class SendOTP {
  constructor(
    private repository: OTPRepository,
    private whatsappService: WhatsAppService
  ) {}

  async execute(phoneNumber: string): Promise<void> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const otp = new OTP(phoneNumber, code, Date.now() + 5 * 60 * 1000);

    this.repository.save(otp);

    await this.whatsappService.sendOTP(phoneNumber, code);
  }
}
