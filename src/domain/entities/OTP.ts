export class OTP {
  constructor(
    public readonly phoneNumber: string,
    public readonly code: string,
    public readonly expiresAt: number
  ) {}

  isExpired(): boolean {
    return Date.now() > this.expiresAt;
  }

  matches(code: string): boolean {
    return this.code === code;
  }
}
