import { QUEUE_NAME } from "@/shared";
import { QueueServiceProtocol } from "@/infra";
import { SendEmailServiceProtocol, SendEmailServiceDTO } from "@/service";

export class SendEmailServiceListener {

    constructor(
        private readonly sendEmailService: SendEmailServiceProtocol,  
        private readonly queueService: QueueServiceProtocol
    ) { }

    execute(): boolean {
        this.queueService.consumeMessage<SendEmailServiceDTO>(QUEUE_NAME, async (message: SendEmailServiceDTO) => {
            await this.sendEmailService.execute(message);
        });

        return true;
    }
}