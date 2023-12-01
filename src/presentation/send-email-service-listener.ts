import { QueueServiceProtocol, SecretsEnum, SecretsServiceProtocol } from "@/infra";
import { SendEmailServiceProtocol, SendEmailServiceDTO } from "@/service";

export class SendEmailServiceListener {

    constructor(
        private readonly sendEmailService: SendEmailServiceProtocol,  
        private readonly queueService: QueueServiceProtocol,
        private readonly secretsService: SecretsServiceProtocol
    ) { }

    execute(): boolean {
        this.queueService.consumeMessage<SendEmailServiceDTO>(
            this.secretsService.getRequiredSecret(SecretsEnum.QueueName), async (message: SendEmailServiceDTO) => {
                await this.sendEmailService.execute(message);
            }
        );

        return true;
    }
}