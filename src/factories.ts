import { QueueServiceAdapter, MailServiceAdapter } from "@/infra";
import { SendEmailService } from "@/service";
import { SendEmailServiceListener } from "@/presentation";

export const mailServiceAdapter = new MailServiceAdapter();
export const queueServiceAdapter = new QueueServiceAdapter();
export const sendEmailService = new SendEmailService(mailServiceAdapter);
export const sendEmailServiceListener = new SendEmailServiceListener(sendEmailService, queueServiceAdapter);