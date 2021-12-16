"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BscPocketProvider = void 0;
const logger_1 = require("@ethersproject/logger");
const providers_1 = require("@ethersproject/providers");
const networks_1 = require("./networks");
const _version_1 = require("./_version");
const logger = new logger_1.Logger(_version_1.version);
const defaultApplicationId = "6136201a7bad1500343e248d";
class BscPocketProvider extends providers_1.PocketProvider {
    constructor(network, apiKey) {
        // We need a bit of creativity in the constructor because
        // Pocket uses different default API keys based on the network
        const n = networks_1.getNetwork(!network ? "bsc-mainnet" : network);
        // If there was any issue above, we don't know this network
        if (!n) {
            logger.throwError("unsupported network", logger_1.Logger.errors.INVALID_ARGUMENT, {
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
                logger.throwError("unsupported network", logger_1.Logger.errors.INVALID_ARGUMENT, {
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
exports.BscPocketProvider = BscPocketProvider;
//# sourceMappingURL=bsc-pocket-provider.js.map