import { SendEmailServiceDTO } from "./send-email-service-dto";

export interface SendEmailServiceProtocol {
    execute(dto: SendEmailServiceDTO): Promise<boolean>;
}