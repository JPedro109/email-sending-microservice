import { 
    QueueAdapter, 
    MailAdapter, 
    SecretsAdapter, 
    QueueHelper, 
    DatabaseNoSQLHelper, 
    EmailSentRepositoryAdapter, 
    LogRepositoryAdapter, 
    LogNoSQLAdapter, 
    LogBashAdapter, 
    LogFacade 
} from "@/infra";
import { SendEmailService } from "@/service";
import { SendEmailServiceListener } from "@/presentation";

// Infra
export const secretsAdapter = new SecretsAdapter();
export const mailAdapter = new MailAdapter(secretsAdapter);
export const queueHelper = new QueueHelper(secretsAdapter);
export const databaseNoSQLHelper = new DatabaseNoSQLHelper(secretsAdapter);
export const emailSentRepository = new EmailSentRepositoryAdapter(databaseNoSQLHelper);
export const logBashAdapter = new LogBashAdapter();
export const logRepository = new LogRepositoryAdapter(databaseNoSQLHelper);
export const logNoSQLAdapter = new LogNoSQLAdapter(logRepository, logBashAdapter);
export const logFacade = new LogFacade(logBashAdapter, logNoSQLAdapter);
export const queueAdapter = new QueueAdapter(queueHelper, logFacade);

// 
export const sendEmail = new SendEmailService(mailAdapter, emailSentRepository, logFacade);

// Presentation
export const sendEmailListener 
    = new SendEmailServiceListener(sendEmail, queueAdapter, secretsAdapter, logFacade);