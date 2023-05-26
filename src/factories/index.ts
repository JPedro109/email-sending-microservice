import { MailServiceAdapter } from "@/layers/external/mail";
import { QueueServiceAdapter } from "@/layers/external/queue";
import { SendEmailUseCase } from "@/layers/send-email-use-case";

export const mailServiceAdapter = new MailServiceAdapter();
export const queueServiceAdapter = new QueueServiceAdapter();
export const sendEmailUseCase = new SendEmailUseCase(mailServiceAdapter);