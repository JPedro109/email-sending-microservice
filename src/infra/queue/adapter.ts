import { Message } from "amqplib";
import { QueueServiceProtocol } from "@/infra";
import { QueueHelper } from "./helper";

export class QueueServiceAdapter implements QueueServiceProtocol {

    private deserializeMessage<Type>(message: Message): Type {
        return JSON.parse(message.content.toString()) as Type;
    }

    async sendMessage(queue: string, object: object): Promise<void> {
        QueueHelper.channel.sendToQueue(queue, Buffer.from(JSON.stringify(object)));
    }
	
    async consumeMessage<Type>(queue: string, callback: (message: Type) => Promise<void>): Promise<void> {
        QueueHelper.channel.consume(queue, async (message) => {
            try {
                const deserializedMessage = this.deserializeMessage<Type>(message);
                await callback(deserializedMessage);
                QueueHelper.channel.ack(message);
            } catch(e) {
                console.log(e);
            }
        });
    }
}