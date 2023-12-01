import { SecretsEnum, SecretsServiceProtocol } from "@/infra";
import { Channel, Connection, connect } from "amqplib";

export class QueueHelper {

    private connection: Connection | null = null;
    channel: Channel;

    constructor(private readonly secretsService: SecretsServiceProtocol) { }

    async connect(): Promise<void> {
        if(!this.connection) {
            this.connection = await connect(this.secretsService.getRequiredSecret(SecretsEnum.QueueHost));
            this.channel = await this.connection.createChannel();
        }
    }

    async disconnect(): Promise<void> {
        await this.connection.close();
    }

    async cancel(queue: string): Promise<void> {
        await this.channel.cancel(queue);
    }
}