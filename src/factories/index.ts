import { QueueServiceAdapter, MailServiceAdapter } from "@/infra";
import { SendEmailUseCase } from "@/layers/send-email-use-case";

export const mailServiceAdapter = new MailServiceAdapter();
export const queueServiceAdapter = new QueueServiceAdapter();
export const sendEmailUseCase = new SendEmailUseCase(mailServiceAdapter);