export type SendEmailServiceDTO = {
    to: string;
    subject: string;
    template: string;
    context?: object;
}