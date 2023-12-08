import { LogServiceProtocol, QueueServiceProtocol, SecretsEnum, SecretsServiceProtocol } from "@/infra";
import { SendEmailServiceProtocol, SendEmailServiceDTO } from "@/service";

export class SendEmailServiceListener {

    constructor(
        private readonly sendEmailService: SendEmailServiceProtocol,  
        private readonly queueService: QueueServiceProtocol,
        private readonly secretsService: SecretsServiceProtocol,
        private readonly logService: LogServiceProtocol
    ) { }

    execute(): boolean {
        this.queueService.consumeMessage<SendEmailServiceDTO>(
            this.secretsService.getRequiredSecret(SecretsEnum.QueueName), async (message: SendEmailServiceDTO) => {
                try {
                    await this.sendEmailService.execute(message);
                } catch(e) {
                    const log = { message: JSON.stringify(message), error: JSON.stringify(e) };
                    this.logService.error("Erro no Envio de Email", JSON.stringify(log));
                }
            }
        );

        this.logService.info("Serviço Iniciado", "Serviço de envio de email iniciado");

        return true;
    }
}