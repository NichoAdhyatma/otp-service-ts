import { OTP } from "../../domain/entities/OTP";
import type { OTPRepository } from "../../domain/repositories/otp-repository";

export class OTPRepositoryMemory implements OTPRepository {
  private store = new Map<string, OTP>();

  save(otp: OTP): void {
    this.store.set(otp.phoneNumber, otp);
  }

  findByPhone(phoneNumber: string): OTP | null {
    return this.store.get(phoneNumber) || null;
  }

  delete(phoneNumber: string): void {
    this.store.delete(phoneNumber);
  }
}
