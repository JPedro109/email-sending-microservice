import { DatabaseNoSQLHelper, EmailSentRepositoryAdapter, SecretsAdapter } from "@/infra";

describe("External - EmailSentRepositoryAdapter", () => {
    
    const databaseNoSQLHelper = new DatabaseNoSQLHelper(new SecretsAdapter());

    beforeAll(async () => {
        await databaseNoSQLHelper.connect();
    });

    afterAll(async () => {
        await databaseNoSQLHelper.getCollection("email-sent", "email-sending-microservice").deleteMany({});
        await databaseNoSQLHelper.disconnect();
    });
    
    test("Should create the email sent | createEmailSent", async () => {
        const email = "email@test.com";
        const subject = "subject";
        const template = "template";
        const context = "context";
        const service = "service";
        const sut = new EmailSentRepositoryAdapter(databaseNoSQLHelper);

        const log = await sut.createEmailSent(email, subject, template, context, service);

        expect(log.email).toBe(email);
        expect(log.subject).toBe(subject);
        expect(log.template).toBe(template);
        expect(log.context).toBe(context);
        expect(log.service).toBe(service);
    });
});