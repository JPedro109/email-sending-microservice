import { QueueHelper } from "@/infra";
import { sendEmailServiceListener } from "@/factories";

QueueHelper
    .connect()
    .then(async () => {
        sendEmailServiceListener.execute();
    })
    .catch(console.error);