import { QueueServiceAdapter, MailServiceAdapter, SecretsServiceAdapter, QueueHelper, DatabaseNoSQLHelper, EmailSentRepositoryAdapter } from "@/infra";
import { SendEmailService } from "@/service";
import { SendEmailServiceListener } from "@/presentation";

// Infra
export const secretsServicesAdapter = new SecretsServiceAdapter();
export const mailServiceAdapter = new MailServiceAdapter(secretsServicesAdapter);
export const queueHelper = new QueueHelper(secretsServicesAdapter);
export const queueServiceAdapter = new QueueServiceAdapter(queueHelper);
export const databaseNoSQLHelper = new DatabaseNoSQLHelper(secretsServicesAdapter);
export const emailSentRepository = new EmailSentRepositoryAdapter(databaseNoSQLHelper);

// Service
export const sendEmailService = new SendEmailService(mailServiceAdapter, emailSentRepository);

// Presentation
export const sendEmailServiceListener = new SendEmailServiceListener(sendEmailService, queueServiceAdapter, secretsServicesAdapter);