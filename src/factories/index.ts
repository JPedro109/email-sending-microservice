import { QueueServiceAdapter, MailServiceAdapter } from "@/infra";
import { SendEmailService } from "@/service";

export const mailServiceAdapter = new MailServiceAdapter();
export const queueServiceAdapter = new QueueServiceAdapter();
export const sendEmailService = new SendEmailService(mailServiceAdapter);