import { MailServiceProtocol, SecretsEnum, SecretsServiceProtocol } from "@/infra";

import path from "path";

import nodemailer, { SentMessageInfo, Transporter } from "nodemailer";
import hbs from "nodemailer-express-handlebars";

export class MailServiceAdapter implements MailServiceProtocol {

    private readonly mail: Transporter<SentMessageInfo>;
    private readonly ssl = false;
    private readonly emailBodiesPath = "./src/infra/mail/bodies";

    constructor(private readonly secretsService: SecretsServiceProtocol) {

        this.mail = nodemailer.createTransport({
            host: this.secretsService.getRequiredSecret(SecretsEnum.HostProviderEmail),
            port: parseInt(this.secretsService.getRequiredSecret(SecretsEnum.PortProviderEmail)),
            secure: this.ssl,
            auth: { 
                user: this.secretsService.getRequiredSecret(SecretsEnum.EmailProviderEmail), 
                pass: this.secretsService.getRequiredSecret(SecretsEnum.PasswordProviderEmail)
            }
        }).use("compile", hbs({
            viewEngine: {
                defaultLayout: null,
                partialsDir: path.resolve(this.emailBodiesPath)
            },
            viewPath: path.resolve(this.emailBodiesPath),
            extName: ".html"
        }));

    }

    async sendMail(to: string, subject: string, html: string, context?: object): Promise<void> {
        const email = {
            from: this.secretsService.getRequiredSecret(SecretsEnum.EmailProviderEmail),
            to,
            subject,
            template: html,
            context
        };
    
        await this.mail.sendMail(email);
    }
}