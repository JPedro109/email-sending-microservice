import { MailServiceProtocol } from "@/infra";
import { SendEmailServiceDTO } from "./send-email-service-dto";

export class SendEmailService {

    constructor(
        private readonly mailService: MailServiceProtocol, 
    ) { }

    async execute(dto: SendEmailServiceDTO): Promise<boolean> {
        const { data } = dto;
        const { to, subject, template, context } = data;
        await this.mailService.sendMail(to, subject, template, context);
        return true;
    }
}