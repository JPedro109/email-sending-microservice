import { QUEUE_NAME } from "@/shared";
import { sendEmailUseCase, queueServiceAdapter } from "@/factories";
import { QueueHelper } from "@/infra";
import { MailDTO } from "@/services";

const bootstrap = async () => {
    await QueueHelper.connect();

    queueServiceAdapter.consumeMessage<MailDTO>(QUEUE_NAME, async (message: MailDTO) => {
        await sendEmailUseCase.execute(message);
    });
};

bootstrap();