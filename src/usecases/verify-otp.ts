import type { OTPRepository } from "../domain/repositories/otp-repository";


export class VerifyOTP {
  constructor(private repository: OTPRepository) {}

  execute(phoneNumber: string, code: string): boolean {
    const otp = this.repository.findByPhone(phoneNumber);

    if (!otp || otp.isExpired()) return false;

    const valid = otp.matches(code);

    if (valid) this.repository.delete(phoneNumber);
    
    return valid;
  }
}
