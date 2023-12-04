/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
    MailServiceProtocol,
    QueueServiceProtocol,
    EmailSentRepositoryProtocol,
    EmailSentModel
} from "@/infra";

export class MailServiceStub implements MailServiceProtocol {
    async sendMail(to: string, subject: string, html: string, context?: object): Promise<void> { 
    }
}

export class QueueServiceStub implements QueueServiceProtocol {
    async sendMessage(queue: string, object: object): Promise<void> { }

    async consumeMessage<Type>(queue: string, callback: (message: Type) => Promise<void>): Promise<void> { }
}

export class EmailSentRepositoryStub implements EmailSentRepositoryProtocol {

    async createEmailSent(email: string, subject: string, template: string, context: string, service: string): Promise<EmailSentModel> {
        return new EmailSentModel("1", email, subject, template, context, service);
    }
}