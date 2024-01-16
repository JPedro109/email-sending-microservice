import { LogModel } from "./log-repository-model";

export interface LogRepositoryProtocol {
    createLog(level: string, title: string, message: string, trace?: string): Promise<LogModel>;
}