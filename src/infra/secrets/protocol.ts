import { SecretsEnum } from "./enum";

export interface SecretsServiceProtocol {
    getSecret(name: SecretsEnum): string | null;
    getRequiredSecret(name: SecretsEnum): string;
}