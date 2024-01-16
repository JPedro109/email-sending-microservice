/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
    LogProtocol,
    QueueProtocol, 
    SecretsEnum, 
    SecretsProtocol
} from "@/infra";
import { SendEmailServiceProtocol, SendEmailServiceDTO } from "@/service";

export class SendEmailServiceStub implements SendEmailServiceProtocol {
    async execute(dto: SendEmailServiceDTO): Promise<boolean> {
        return true;
    }
}

export class QueueStub implements QueueProtocol {
    async sendMessage(queue: string, object: object): Promise<void> { }

    async consumeMessage<Type>(queue: string, callback: (message: Type) => Promise<void>): Promise<void> { }
}

export class SecretsStub implements SecretsProtocol {
    
    getSecret(name: SecretsEnum): string | null {
        return name;

    }

    getRequiredSecret(name: SecretsEnum): string {
        return name;
    }
}

export class LogFacadeStub implements LogProtocol {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    trace(title: string, message: string, trace: string): boolean {
        throw new Error("Method not implemented.");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(title: string, message: string): boolean {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warning(title: string, message: string): boolean {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(title: string, message: string): boolean {
        return true;
    }
}