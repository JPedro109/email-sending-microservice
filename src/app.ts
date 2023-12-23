import { databaseNoSQLHelper, queueHelper, sendEmailListener } from "@/factories";

queueHelper
    .connect()
    .then(async () => {
        await databaseNoSQLHelper.connect();
        sendEmailListener.execute();
    })
    .catch(console.error);