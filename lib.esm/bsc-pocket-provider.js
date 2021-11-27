import { Logger } from "@ethersproject/logger";
import { PocketProvider } from "@ethersproject/providers";
import { getNetwork } from "./networks";
import { version } from "./_version";
const logger = new Logger(version);
const defaultApplicationId = "6136201a7bad1500343e248d";
export class BscPocketProvider extends PocketProvider {
    constructor(network, apiKey) {
        // We need a bit of creativity in the constructor because
        // Pocket uses different default API keys based on the network
        const n = getNetwork(!network ? "bsc-mainnet" : network);
        // If there was any issue above, we don't know this network
        if (!n) {
            logger.throwError("unsupported network", Logger.errors.INVALID_ARGUMENT, {
                argument: "network",
                value: network
            });
        }
        if (!apiKey) {
            apiKey = {
                applicationId: defaultApplicationId,
                loadBalancer: true
            };
        }
        super(n, apiKey);
    }
    static getUrl(network, apiKey) {
        let host = null;
        switch (network ? network.name : "unknown") {
            case "bsc-mainnet":
                host = "bsc-mainnet.gateway.pokt.network";
                break;
            default:
                logger.throwError("unsupported network", Logger.errors.INVALID_ARGUMENT, {
                    argument: "network",
                    value: network
                });
        }
        let url = `https:/\/${host}/v1/lb/${apiKey.applicationId}`;
        const connection = { url };
        // Initialize empty headers
        connection.headers = {};
        // Apply application secret key
        if (apiKey.applicationSecretKey != null) {
            connection.user = "";
            connection.password = apiKey.applicationSecretKey;
        }
        return connection;
    }
    isCommunityResource() {
        return (this.applicationId === defaultApplicationId);
    }
}
//# sourceMappingURL=bsc-pocket-provider.js.map