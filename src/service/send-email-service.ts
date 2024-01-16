import { EmailSentRepositoryProtocol, LogProtocol, MailProtocol } from "@/infra";
import { SendEmailServiceDTO, SendEmailServiceProtocol } from "@/service";

export class SendEmailService implements SendEmailServiceProtocol {

    constructor(
        private readonly mailService: MailProtocol, 
        private readonly emailSentRepositoryProtocol: EmailSentRepositoryProtocol, 
        private readonly log: LogProtocol
    ) { }

    async execute(dto: SendEmailServiceDTO): Promise<boolean> {
        const { data } = dto;
        const { to, subject, template, context, service } = data;
        await this.mailService.sendMail(to, subject, template, context);
        await this.emailSentRepositoryProtocol.createEmailSent(to, subject, template, JSON.stringify(context), service);
        this.log.info("Email enviado", `${subject} - ${to}`);
        return true;
    }
}