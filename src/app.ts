import { queueHelper, sendEmailServiceListener } from "@/factories";

queueHelper
    .connect()
    .then(async () => {
        sendEmailServiceListener.execute();
    })
    .catch(console.error);