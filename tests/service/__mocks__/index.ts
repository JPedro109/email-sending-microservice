/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
    MailProtocol,
    QueueProtocol,
    EmailSentRepositoryProtocol,
    EmailSentModel,
    LogProtocol
} from "@/infra";

export class MailStub implements MailProtocol {
    async sendMail(to: string, subject: string, html: string, context?: object): Promise<void> { 
    }
}

export class QueueStub implements QueueProtocol {
    async sendMessage(queue: string, object: object): Promise<void> { }

    async consumeMessage<Type>(queue: string, callback: (message: Type) => Promise<void>): Promise<void> { }
}

export class EmailSentRepositoryStub implements EmailSentRepositoryProtocol {

    async createEmailSent(email: string, subject: string, template: string, context: string, service: string): Promise<EmailSentModel> {
        return new EmailSentModel("1", email, subject, template, context, service);
    }
}

export class LogFacadeStub implements LogProtocol {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    trace(title: string, message: string, trace: string): boolean {
        throw new Error("Method not implemented.");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(title: string, message: string): boolean {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warning(title: string, message: string): boolean {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(title: string, message: string): boolean {
        return true;
    }
}