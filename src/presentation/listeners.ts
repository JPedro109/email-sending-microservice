import { QUEUE_NAME } from "@/shared";
import { sendEmailService, queueServiceAdapter } from "@/factories";
import { SendEmailServiceDTO } from "@/services";

export const mailServiceListener = () => 
    queueServiceAdapter.consumeMessage<SendEmailServiceDTO>(QUEUE_NAME, async (message: SendEmailServiceDTO) => {
        await sendEmailService.execute(message);
    });