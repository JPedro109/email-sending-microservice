import { QUEUE_NAME } from "@/shared";
import { sendEmailUseCase, queueServiceAdapter } from "@/factories";
import { QueueHelper } from "@/infra";
import { SendEmailServiceDTO } from "@/services";

const bootstrap = async () => {
    await QueueHelper.connect();

    queueServiceAdapter.consumeMessage<SendEmailServiceDTO>(QUEUE_NAME, async (message: SendEmailServiceDTO) => {
        await sendEmailUseCase.execute(message);
    });
};

bootstrap();