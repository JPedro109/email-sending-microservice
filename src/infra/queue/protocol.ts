export interface QueueProtocol {
    sendMessage(queue: string, object: object): Promise<void>;
    consumeMessage<Type>(queue: string, callback: (message: Type) => Promise<void>): Promise<void>;
}