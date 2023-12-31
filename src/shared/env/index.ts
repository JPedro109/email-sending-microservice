import "dotenv/config";

export const EMAIL_PROVIDER_EMAIL = process.env.EMAIL_PROVIDER_EMAIL;
export const PASSWORD_PROVIDER_EMAIL = process.env.PASSWORD_PROVIDER_EMAIL;
export const HOST_PROVIDER_EMAIL = process.env.HOST_PROVIDER_EMAIL;
export const PORT_PROVIDER_EMAIL = parseInt(process.env.PORT_PROVIDER_EMAIL);
export const QUEUE_HOST = process.env.QUEUE_HOST;
export const QUEUE_NAME = process.env.QUEUE_NAME;