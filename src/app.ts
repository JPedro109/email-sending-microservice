import { QueueHelper } from "@/infra";
import { mailServiceListener } from "@/presentation";

const bootstrap = async () => {
    await QueueHelper
        .connect()
        .then(() => {
            mailServiceListener();
            console.log("Serviço de envio de email iniciado");
        })
        .catch(e => console.log(e));
};

bootstrap();