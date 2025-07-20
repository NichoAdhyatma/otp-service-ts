export interface WhatsAppService {
  sendOTP(phoneNumber: string, code: string): Promise<void>;
}
