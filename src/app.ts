import { QUEUE_NAME } from "@/shared";
import { sendEmailUseCase, queueServiceAdapter } from "@/factories";
import { QueueHelper } from "@/layers/external";
import { MailDTO } from "@/layers/send-email-use-case";

const bootstrap = async () => {
    await QueueHelper.connect();

    queueServiceAdapter.consumeMessage<MailDTO>(QUEUE_NAME, async (message: MailDTO) => {
        await sendEmailUseCase.execute(message);
    });
};

bootstrap();