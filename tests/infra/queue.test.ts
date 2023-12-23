import { 
    QueueAdapter,
    QueueHelper,
    SecretsAdapter,
    LogBashAdapter,
    LogRepositoryAdapter,
    LogNoSQLAdapter,
    LogFacade,
    DatabaseNoSQLHelper 
} from "@/infra";

describe("Infra - QueueAdapter", () => {
    
    const queue = "queue";
    const secretsAdapter = new SecretsAdapter();
    const databaseNoSQLHelper = new DatabaseNoSQLHelper(secretsAdapter);
    const logBashAdapter = new LogBashAdapter();
    const logRepository = new LogRepositoryAdapter(databaseNoSQLHelper);
    const logNoSQLAdapter = new LogNoSQLAdapter(logRepository, logBashAdapter);
    const logFacade = new LogFacade(logBashAdapter, logNoSQLAdapter);
    const queueHelper = new QueueHelper(secretsAdapter);

    beforeAll(async () => {
        await queueHelper.connect();
        await queueHelper.channel.assertQueue(queue);
    });
    afterAll(async () => {
        await queueHelper.cancel(queue);
        await queueHelper.disconnect();
    });

    test("Should send message | sendMessage", async () => {
        const sut = new QueueAdapter(queueHelper, logFacade);
        jest.spyOn(sut, "sendMessage");
        
        await sut.sendMessage("queue", { name: "João" });

        expect(sut.sendMessage).toHaveBeenCalled();
        expect(sut.sendMessage).toHaveBeenCalledWith("queue", { name: "João" });
    });

    test("Should receive message | sendMessage", async () => {
        const sut = new QueueAdapter(queueHelper, logFacade);
        jest.spyOn(sut, "sendMessage");
        await sut.sendMessage(queue, { name: "João" });
		
        await sut.consumeMessage<{ name: string }>("queue", async (message) => expect(message.name).toBe("João"));

        expect(sut.sendMessage).toHaveBeenCalled();
        expect(sut.sendMessage).toHaveBeenCalledWith("queue", { name: "João" });
    });
});