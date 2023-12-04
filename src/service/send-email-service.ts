import { EmailSentRepositoryProtocol, MailServiceProtocol } from "@/infra";
import { SendEmailServiceDTO, SendEmailServiceProtocol } from "@/service";

export class SendEmailService implements SendEmailServiceProtocol {

    constructor(
        private readonly mailService: MailServiceProtocol, 
        private readonly emailSentRepositoryProtocol: EmailSentRepositoryProtocol, 
    ) { }

    async execute(dto: SendEmailServiceDTO): Promise<boolean> {
        const { data } = dto;
        const { to, subject, template, context, service } = data;
        await this.mailService.sendMail(to, subject, template, context);
        await this.emailSentRepositoryProtocol.createEmailSent(to, subject, template, JSON.stringify(context), service);
        return true;
    }
}