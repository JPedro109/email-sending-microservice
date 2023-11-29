import { Message } from "amqplib";
import { QueueServiceProtocol } from "@/infra";
import { QueueHelper } from "./helper";

export class QueueServiceAdapter implements QueueServiceProtocol {

    constructor(private readonly queueHelper: QueueHelper) { }

    private deserializeMessage<Type>(message: Message): Type {
        return JSON.parse(message.content.toString()) as Type;
    }

    async sendMessage(queue: string, object: object): Promise<void> {
        this.queueHelper.channel.sendToQueue(queue, Buffer.from(JSON.stringify(object)));
    }
	
    async consumeMessage<Type>(queue: string, callback: (message: Type) => Promise<void>): Promise<void> {
        this.queueHelper.channel.consume(queue, async (message) => {
            try {
                const deserializedMessage = this.deserializeMessage<Type>(message);
                await callback(deserializedMessage);
                this.queueHelper.channel.ack(message);
            } catch(e) {
                console.log(e);
            }
        });
    }
}