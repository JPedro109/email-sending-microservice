/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
    QueueServiceProtocol, 
    SecretsEnum, 
    SecretsServiceProtocol
} from "@/infra";
import { SendEmailServiceProtocol, SendEmailServiceDTO } from "@/service";

export class SendEmailServiceStub implements SendEmailServiceProtocol {
    async execute(dto: SendEmailServiceDTO): Promise<boolean> {
        return true;
    }
}

export class QueueServiceStub implements QueueServiceProtocol {
    async sendMessage(queue: string, object: object): Promise<void> { }

    async consumeMessage<Type>(queue: string, callback: (message: Type) => Promise<void>): Promise<void> { }
}

export class SecretsServiceStub implements SecretsServiceProtocol {
    
    getSecret(name: SecretsEnum): string | null {
        return name;

    }

    getRequiredSecret(name: SecretsEnum): string {
        return name;
    }
}