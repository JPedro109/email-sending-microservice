import { MailServiceAdapter, SecretsServiceAdapter } from "@/infra";

describe("Infra - MailServiceAdapter", () => {
    const secretsServiceAdapter = new SecretsServiceAdapter();

    test("Should send email | sendEmail", async () => {
        const email = "email@test.com";
        const subject = "Test";
        const html = "create-user-body";
        const sut = new MailServiceAdapter(secretsServiceAdapter);
        jest.spyOn(sut, "sendMail");
        
        await sut.sendMail(email, subject, html);

        expect(sut.sendMail).toHaveBeenCalled();
        expect(sut.sendMail).toHaveBeenCalledWith(email, subject, html);
    });
});