import { EmailSentModel } from "./email-sent-model";

export interface EmailSentRepositoryProtocol {
    createEmailSent(email: string, subject: string, template: string, context: string, service: string): Promise<EmailSentModel>;
}