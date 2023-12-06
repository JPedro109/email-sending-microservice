import { databaseNoSQLHelper, queueHelper, sendEmailServiceListener } from "@/factories";

queueHelper
    .connect()
    .then(async () => {
        await databaseNoSQLHelper.connect();
        sendEmailServiceListener.execute();
    })
    .catch(console.error);