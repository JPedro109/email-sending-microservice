import { MailServiceProtocol } from "@/infra";
import { MailDTO } from "./dto";

export class SendEmailService {

    constructor(
        private readonly mailService: MailServiceProtocol, 
    ) { }

    async execute({ to, subject, template, context }: MailDTO): Promise<boolean> {
        await this.mailService.sendMail(to, subject, template, context);
        return true;
    }
}