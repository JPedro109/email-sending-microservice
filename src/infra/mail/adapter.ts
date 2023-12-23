import { MailProtocol, SecretsEnum, SecretsProtocol } from "@/infra";

import path from "path";

import nodemailer, { SentMessageInfo, Transporter } from "nodemailer";
import hbs from "nodemailer-express-handlebars";

export class MailAdapter implements MailProtocol {

    private readonly mail: Transporter<SentMessageInfo>;
    private readonly ssl = false;
    private readonly emailBodiesPath = "./src/infra/mail/bodies";

    constructor(private readonly secrets: SecretsProtocol) {

        this.mail = nodemailer.createTransport({
            host: this.secrets.getRequiredSecret(SecretsEnum.HostProviderEmail),
            port: parseInt(this.secrets.getRequiredSecret(SecretsEnum.PortProviderEmail)),
            secure: this.ssl,
            auth: { 
                user: this.secrets.getRequiredSecret(SecretsEnum.EmailProviderEmail), 
                pass: this.secrets.getRequiredSecret(SecretsEnum.PasswordProviderEmail)
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
            from: this.secrets.getRequiredSecret(SecretsEnum.EmailProviderEmail),
            to,
            subject,
            template: html,
            context
        };
    
        await this.mail.sendMail(email);
    }
}