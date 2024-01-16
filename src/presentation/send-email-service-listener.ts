import { LogProtocol, QueueProtocol, SecretsEnum, SecretsProtocol } from "@/infra";
import { SendEmailServiceProtocol, SendEmailServiceDTO } from "@/service";

export class SendEmailServiceListener {

    constructor(
        private readonly sendEmailService: SendEmailServiceProtocol,  
        private readonly queue: QueueProtocol,
        private readonly secrets: SecretsProtocol,
        private readonly log: LogProtocol
    ) { }

    execute(): boolean {
        this.queue.consumeMessage<SendEmailServiceDTO>(
            this.secrets.getRequiredSecret(SecretsEnum.QueueName), async (message: SendEmailServiceDTO) => {
                try {
                    await this.sendEmailService.execute(message);
                } catch(e) {
                    const log = { message: JSON.stringify(message), error: JSON.stringify(e) };
                    this.log.error("Erro no Envio de Email", JSON.stringify(log));
                }
            }
        );

        this.log.info("Serviço Iniciado", "Serviço de envio de email iniciado");

        return true;
    }
}