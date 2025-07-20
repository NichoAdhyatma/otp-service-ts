import type { OTP } from "../entities/OTP";

export interface OTPRepository {
  save(otp: OTP): void;
  findByPhone(phoneNumber: string): OTP | null;
  delete(phoneNumber: string): void;
}
