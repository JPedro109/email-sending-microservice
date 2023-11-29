import { QueueServiceAdapter, MailServiceAdapter, SecretsServiceAdapter, QueueHelper } from "@/infra";
import { SendEmailService } from "@/service";
import { SendEmailServiceListener } from "@/presentation";

export const secretsServicesAdapter = new SecretsServiceAdapter();
export const mailServiceAdapter = new MailServiceAdapter();
export const queueHelper = new QueueHelper();
export const queueServiceAdapter = new QueueServiceAdapter(queueHelper);
export const sendEmailService = new SendEmailService(mailServiceAdapter);
export const sendEmailServiceListener = new SendEmailServiceListener(sendEmailService, queueServiceAdapter);