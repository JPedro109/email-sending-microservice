import { MailServiceProtocol } from "@/layers/send-email-use-case/ports";
import { MailDTO } from "./dto";

export class SendEmailUseCase {

    constructor(
        private readonly mailService: MailServiceProtocol, 
    ) { }

    async execute({ to, subject, template, context }: MailDTO): Promise<boolean> {
        await this.mailService.sendMail(to, subject, template, context);
        return true;
    }
}