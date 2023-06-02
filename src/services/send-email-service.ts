import { MailServiceProtocol } from "@/infra";
import { SendEmailServiceDTO } from "./send-email-service-dto";

export class SendEmailService {

    constructor(
        private readonly mailService: MailServiceProtocol, 
    ) { }

    async execute({ to, subject, template, context }: SendEmailServiceDTO): Promise<boolean> {
        await this.mailService.sendMail(to, subject, template, context);
        return true;
    }
}