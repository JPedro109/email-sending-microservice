import { SendEmailServiceListener } from "@/presentation";
import { LogFacadeStub, QueueStub, SecretsStub, SendEmailServiceStub } from "./__mocks__";

const makeSut = () => {
    const sendEmailServiceStub = new SendEmailServiceStub();
    const queueStub = new QueueStub();
    const secretsStub = new SecretsStub();
    const logFacadeStub = new LogFacadeStub();
    const sut = new SendEmailServiceListener(sendEmailServiceStub, queueStub, secretsStub, logFacadeStub);

    return {
        sut
    };
};

describe("Presentation - SendEmailListener", () => {
    test("Should send email", async () => {
        const { sut } = makeSut();

        const result = sut.execute();

        expect(result).toBe(true);
    });
});