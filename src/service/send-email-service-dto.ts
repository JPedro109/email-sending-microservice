export type SendEmailServiceDTO = {
    pattern: string;
    data: {
        to: string;
        subject: string;
        template: string;
        context?: object;
        service?: object
    }
}