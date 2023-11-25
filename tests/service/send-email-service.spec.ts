import { SendEmailService } from "@/service";
import { MailServiceStub } from "./__mocks__";

const makeSut = () => {
    const mailStub = new MailServiceStub();
    const sut = new SendEmailService(mailStub);

    return {
        sut
    };
};

describe("Service - SendEmail", () => {

    test("Shoud send email", async () => {
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