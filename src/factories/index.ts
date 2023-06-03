import { QueueServiceAdapter, MailServiceAdapter } from "@/infra";
import { SendEmailService } from "@/services";

export const mailServiceAdapter = new MailServiceAdapter();
export const queueServiceAdapter = new QueueServiceAdapter();
export const sendEmailService = new SendEmailService(mailServiceAdapter);