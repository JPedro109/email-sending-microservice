import { SendEmailUseCase } from "@/layers/send-email-use-case";
import { MailServiceStub } from "./__mocks__";

const makeSut = () => {
    const mailStub = new MailServiceStub();
    const sut = new SendEmailUseCase(mailStub);

    return {
        sut
    };
};

describe("Use case - SendEmail", () => {

    test("Shoud send email", async () => {
        const to = "email@test.com";
        const subject = "Test";
        const template = "create-body";
        const { sut } = makeSut();

        const result = await sut.execute({ to, subject, template });

        expect(result).toBe(true);
    });

});