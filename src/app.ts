import { QueueHelper } from "@/infra";
import { mailServiceListener } from "@/presentation";

const bootstrap = async () => {
    await QueueHelper.connect();
    mailServiceListener();
    console.log("Serviço de envio de email iniciado");
};

bootstrap();