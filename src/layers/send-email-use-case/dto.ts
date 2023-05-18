export type MailDTO = {
    to: string;
    subject: string;
    template: string;
    context?: object;
}