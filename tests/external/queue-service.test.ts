import { QueueServiceAdapter, QueueHelper } from "@/infra";

describe("External - QueueServiceAdapter", () => {
    
    const queue = "queue";

    beforeAll(async () => await QueueHelper.connect());
    afterAll(async () => {
        await QueueHelper.cancel(queue);
        await QueueHelper.disconnect();
    });

    test("Should send message | sendMessage", async () => {
        const sut = new QueueServiceAdapter();
        jest.spyOn(sut, "sendMessage");
        
        await sut.sendMessage("queue", { name: "João" });

        expect(sut.sendMessage).toHaveBeenCalled();
        expect(sut.sendMessage).toHaveBeenCalledWith("queue", { name: "João" });
    });

    test("Should receive message | sendMessage", async () => {
        const sut = new QueueServiceAdapter();
        jest.spyOn(sut, "sendMessage");
        await sut.sendMessage(queue, { name: "João" });
		
        await sut.consumeMessage<{ name: string }>("queue", async (message) => expect(message.name).toBe("João"));

        expect(sut.sendMessage).toHaveBeenCalled();
        expect(sut.sendMessage).toHaveBeenCalledWith("queue", { name: "João" });
    });
});