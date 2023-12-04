import { SendEmailService } from "@/service";
import { EmailSentRepositoryStub, MailServiceStub } from "./__mocks__";

const makeSut = () => {
    const mailStub = new MailServiceStub();
    const emailSentRepositoryStub = new EmailSentRepositoryStub();
    const sut = new SendEmailService(mailStub, emailSentRepositoryStub);

    return {
        sut
    };
};

describe("Service - SendEmailService", () => {

    test("Should send email", async () => {
        const to = "email@test.com";
        const subject = "Test";
        const template = "create-body";
        const { sut } = makeSut();

        const result = await sut.execute({
            pattern: "send_email",
            data: { to, subject, template }
        });

        expect(result).toBe(true);
    });

});