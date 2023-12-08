import { SendEmailServiceListener } from "@/presentation";
import { LogServiceFacadeStub, QueueServiceStub, SecretsServiceStub, SendEmailServiceStub } from "./__mocks__";

const makeSut = () => {
    const sendEmailServiceStub = new SendEmailServiceStub();
    const queueServiceStub = new QueueServiceStub();
    const secretsServiceStub = new SecretsServiceStub();
    const logServiceFacadeStub = new LogServiceFacadeStub();
    const sut = new SendEmailServiceListener(sendEmailServiceStub, queueServiceStub, secretsServiceStub, logServiceFacadeStub);

    return {
        sut
    };
};

describe("Presentation - SendEmailServiceListener", () => {
    test("Should send email", async () => {
        const { sut } = makeSut();

        const result = sut.execute();

        expect(result).toBe(true);
    });
});