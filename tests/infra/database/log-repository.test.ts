import { DatabaseNoSQLHelper, LogRepositoryAdapter, SecretsAdapter } from "@/infra";

describe("Infra - LogRepositoryAdapter", () => {
    
    const databaseNoSQLHelper = new DatabaseNoSQLHelper(new SecretsAdapter());

    beforeAll(async () => {
        await databaseNoSQLHelper.connect();
    });

    afterAll(async () => {
        await databaseNoSQLHelper.getCollection("email-sending-microservice-log", "log").deleteMany({});
        await databaseNoSQLHelper.disconnect();
    });
    
    test("Should create the log | createLog", async () => {
        const level = "[INFO]";
        const title = "title";
        const message = "{\"name\":\"test\"}";
        const sut = new LogRepositoryAdapter(databaseNoSQLHelper);

        const log = await sut.createLog(level, title, message);

        expect(log.level).toBe(level);
        expect(log.title).toBe(title);
        expect(log.message).toBe(message);
    });

});