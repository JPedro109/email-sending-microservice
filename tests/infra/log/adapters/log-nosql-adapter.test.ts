import { DatabaseNoSQLHelper, LogRepositoryAdapter, SecretsAdapter, LogNoSQLAdapter, LogBashAdapter } from "@/infra";

describe("External - LogNoSQLAdapter", () => {
    
    const secretsAdapter = new SecretsAdapter();
    const logRepository = new LogRepositoryAdapter(new DatabaseNoSQLHelper(secretsAdapter));
    const logBashAdapter = new LogBashAdapter();

    test("Should return true but the insertation will fail | trace", () => {
        const title = "TEST";
        const message = "{\"name\":\"test\"}";
        const trace = "0000000000";
        const sut = new LogNoSQLAdapter(logRepository, logBashAdapter);
        jest.spyOn(sut, "trace");
        jest
            .spyOn(logRepository, "createLog")
            .mockReturnValueOnce(Promise.reject(new Error("TEST")));
    
        const result = sut.trace(title, message, trace);
    
        expect(result).toBeTruthy();
        expect(sut.trace).toHaveBeenCalled();
        expect(sut.trace).toHaveBeenCalledWith(title, message, trace);
    });
    
    
    test("Should return true | trace", () => {
        const title = "TEST";
        const message = "{\"name\":\"test\"}";
        const trace = "0000000000";
        const sut = new LogNoSQLAdapter(logRepository, logBashAdapter);
        jest.spyOn(sut, "trace");

        const result = sut.trace(title, message, trace);

        expect(result).toBeTruthy();
        expect(sut.trace).toHaveBeenCalled();
        expect(sut.trace).toHaveBeenCalledWith(title, message, trace);
    });

    test("Should return true but the insertation will fail | info", () => {
        const title = "TEST";
        const message = "{\"name\":\"test\"}";
        const sut = new LogNoSQLAdapter(logRepository, logBashAdapter);
        jest.spyOn(sut, "info");
        jest
            .spyOn(logRepository, "createLog")
            .mockReturnValueOnce(Promise.reject(new Error("TEST")));
    
        const result = sut.info(title, message);
    
        expect(result).toBeTruthy();
        expect(sut.info).toHaveBeenCalled();
        expect(sut.info).toHaveBeenCalledWith(title, message);
    });

    test("Should return true | info", () => {
        const title = "TEST";
        const message = "{\"name\":\"test\"}";
        const sut = new LogNoSQLAdapter(logRepository, logBashAdapter);
        jest.spyOn(sut, "info");

        const result = sut.info(title, message);

        expect(result).toBeTruthy();
        expect(sut.info).toHaveBeenCalled();
        expect(sut.info).toHaveBeenCalledWith(title, message);
    });

    test("Should return true but the insertation will fail | warning", () => {
        const title = "TEST";
        const message = "{\"name\":\"test\"}";
        const sut = new LogNoSQLAdapter(logRepository, logBashAdapter);
        jest.spyOn(sut, "warning");
        jest
            .spyOn(logRepository, "createLog")
            .mockReturnValueOnce(Promise.reject(new Error("TEST")));
    
        const result = sut.warning(title, message);
    
        expect(result).toBeTruthy();
        expect(sut.warning).toHaveBeenCalled();
        expect(sut.warning).toHaveBeenCalledWith(title, message);
    });

    test("Should return true | warning", () => {
        const title = "TEST";
        const message = "{\"name\":\"test\"}";
        const sut = new LogNoSQLAdapter(logRepository, logBashAdapter);
        jest.spyOn(sut, "warning");

        const result = sut.warning(title, message);

        expect(result).toBeTruthy();
        expect(sut.warning).toHaveBeenCalled();
        expect(sut.warning).toHaveBeenCalledWith(title, message);
    });

    test("Should return true but the insertation will fail | error", () => {
        const title = "TEST";
        const message = "{\"name\":\"test\"}";
        const sut = new LogNoSQLAdapter(logRepository, logBashAdapter);
        jest.spyOn(sut, "error");
        jest
            .spyOn(logRepository, "createLog")
            .mockReturnValueOnce(Promise.reject(new Error("TEST")));
    
        const result = sut.error(title, message);
    
        expect(result).toBeTruthy();
        expect(sut.error).toHaveBeenCalled();
        expect(sut.error).toHaveBeenCalledWith(title, message);
    });

    test("Should return true | error", () => {
        const title = "TEST";
        const message = "{\"name\":\"test\"}";
        const sut = new LogNoSQLAdapter(logRepository, logBashAdapter);
        jest.spyOn(sut, "error");

        const result = sut.error(title, message);

        expect(result).toBeTruthy();
        expect(sut.error).toHaveBeenCalled();
        expect(sut.error).toHaveBeenCalledWith(title, message);
    });
});