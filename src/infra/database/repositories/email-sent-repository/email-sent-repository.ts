import { EmailSentRepositoryProtocol, EmailSentModel, DatabaseNoSQLHelper } from "@/infra";

import { WithId, Document } from "mongodb";

export class EmailSentRepositoryAdapter implements EmailSentRepositoryProtocol {
    private readonly collection = "email-sent";

    constructor(private readonly databaseNoSQLHelper: DatabaseNoSQLHelper) { }

    private toMapperEmailSentModel(emailSent: WithId<Document>) {
        return new EmailSentModel(
            emailSent._id.toString(), 
            emailSent.email, 
            emailSent.subject, 
            emailSent.template, 
            emailSent.context,
            emailSent.service
        );
    }

    async createEmailSent(email: string, subject: string, template: string, context: string, service: string): Promise<EmailSentModel> {
        const emailSentCollection = await this.databaseNoSQLHelper.getCollection(this.collection).insertOne({
            email,
            subject,
            template,
            context,
            service,
            created_at: new Date()
        });

        const emailSentInserted = await this.databaseNoSQLHelper
            .getCollection(this.collection)
            .findOne({ _id: emailSentCollection.insertedId });

        return this.toMapperEmailSentModel(emailSentInserted);
    }
}