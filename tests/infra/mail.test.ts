import { MailAdapter, SecretsAdapter } from "@/infra";

describe("Infra - MailAdapter", () => {
    const secretsAdapter = new SecretsAdapter();

    test("Should send email | sendEmail", async () => {
        const email = "email@test.com";
        const subject = "Test";
        const html = "create-user-body";
        const sut = new MailAdapter(secretsAdapter);
        jest.spyOn(sut, "sendMail");
        
        await sut.sendMail(email, subject, html);

        expect(sut.sendMail).toHaveBeenCalled();
        expect(sut.sendMail).toHaveBeenCalledWith(email, subject, html);
    });
});