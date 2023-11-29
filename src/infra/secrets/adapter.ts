import { SecretsEnum } from "./enum";
import { SecretsServiceProtocol } from "./protocol";

import "dotenv/config";

export class SecretsServiceAdapter implements SecretsServiceProtocol {
    
    getSecret(name: SecretsEnum): string | null {
        const value = process.env[name];

        if(!value) return null;

        return value;
    }

    getRequiredSecret(name: SecretsEnum): string {
        const value = process.env[name];

        if(!value) throw new Error(name);

        return value;
    }
}