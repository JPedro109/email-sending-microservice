import { 
    QueueServiceAdapter, 
    MailServiceAdapter, 
    SecretsServiceAdapter, 
    QueueHelper, 
    DatabaseNoSQLHelper, 
    EmailSentRepositoryAdapter, 
    LogRepositoryAdapter, 
    LogNoSQLAdapter, 
    LogBashAdapter, 
    LogServiceFacade 
} from "@/infra";
import { SendEmailService } from "@/service";
import { SendEmailServiceListener } from "@/presentation";

// Infra
export const secretsServicesAdapter = new SecretsServiceAdapter();
export const mailServiceAdapter = new MailServiceAdapter(secretsServicesAdapter);
export const queueHelper = new QueueHelper(secretsServicesAdapter);
export const queueServiceAdapter = new QueueServiceAdapter(queueHelper);
export const databaseNoSQLHelper = new DatabaseNoSQLHelper(secretsServicesAdapter);
export const emailSentRepository = new EmailSentRepositoryAdapter(databaseNoSQLHelper);
export const logBashAdapter = new LogBashAdapter();
export const logRepository = new LogRepositoryAdapter(databaseNoSQLHelper);
export const logNoSQLAdapter = new LogNoSQLAdapter(logRepository, logBashAdapter);
export const logServiceFacade = new LogServiceFacade(logBashAdapter, logNoSQLAdapter);

// Service
export const sendEmailService = new SendEmailService(mailServiceAdapter, emailSentRepository, logServiceFacade);

// Presentation
export const sendEmailServiceListener 
    = new SendEmailServiceListener(sendEmailService, queueServiceAdapter, secretsServicesAdapter, logServiceFacade);