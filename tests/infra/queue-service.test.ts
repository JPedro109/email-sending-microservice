import { QueueServiceAdapter, QueueHelper } from "@/infra";

describe("Infra - QueueServiceAdapter", () => {
    
    const queue = "queue";
    const queueHelper = new QueueHelper();

    beforeAll(async () => {
        await queueHelper.connect();
        await queueHelper.channel.assertQueue(queue);
    });
    afterAll(async () => {
        await queueHelper.cancel(queue);
        await queueHelper.disconnect();
    });

    test("Should send message | sendMessage", async () => {
        const sut = new QueueServiceAdapter(queueHelper);
        jest.spyOn(sut, "sendMessage");
        
        await sut.sendMessage("queue", { name: "João" });

        expect(sut.sendMessage).toHaveBeenCalled();
        expect(sut.sendMessage).toHaveBeenCalledWith("queue", { name: "João" });
    });

    test("Should receive message | sendMessage", async () => {
        const sut = new QueueServiceAdapter(queueHelper);
        jest.spyOn(sut, "sendMessage");
        await sut.sendMessage(queue, { name: "João" });
		
        await sut.consumeMessage<{ name: string }>("queue", async (message) => expect(message.name).toBe("João"));

        expect(sut.sendMessage).toHaveBeenCalled();
        expect(sut.sendMessage).toHaveBeenCalledWith("queue", { name: "João" });
    });
});