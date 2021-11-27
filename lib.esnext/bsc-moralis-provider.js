"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BscMoralisProvider = exports.BscMoralisWebSocketProvider = void 0;
const properties_1 = require("@ethersproject/properties");
const logger_1 = require("@ethersproject/logger");
const providers_1 = require("@ethersproject/providers");
const networks_1 = require("./networks");
const _version_1 = require("./_version");
const logger = new logger_1.Logger(_version_1.version);
class BscMoralisWebSocketProvider extends providers_1.WebSocketProvider {
    constructor(network, apiKey) {
        const provider = new BscMoralisProvider(network, apiKey);
        const connection = provider.connection;
        const url = `${connection.url.replace(/^http/i, "ws")}/ws`;
        super(url, network);
        properties_1.defineReadOnly(this, "apiKey", provider.apiKey);
    }
    isCommunityResource() {
        return false;
    }
}
exports.BscMoralisWebSocketProvider = BscMoralisWebSocketProvider;
class BscMoralisProvider extends providers_1.UrlJsonRpcProvider {
    constructor(network, apiKey) {
        const standardNetwork = networks_1.getNetwork(!network ? "bsc-mainnet" : network);
        switch ((standardNetwork || {}).name) {
            case "bsc-mainnet":
            case "bsc-testnet":
                break;
            default:
                logger.throwError("unsupported network", logger_1.Logger.errors.UNSUPPORTED_OPERATION, {
                    network
                });
        }
        if (apiKey == null) {
            logger.throwError("no default apiKey", logger_1.Logger.errors.INVALID_ARGUMENT, {
                argument: "apiKey",
                value: apiKey
            });
        }
        super(standardNetwork, apiKey);
    }
    static getApiKey(apiKey) {
        const apiKeyObj = {
            apiKey: null,
            region: "nyc"
        };
        if (typeof apiKey === "string") {
            apiKeyObj.apiKey = apiKey;
        }
        else {
            if (apiKey.apiKey != null) {
                apiKeyObj.apiKey = apiKey.apiKey;
            }
            if (apiKey.region != null) {
                apiKeyObj.region = apiKeyObj.region;
            }
        }
        if (apiKeyObj.apiKey == null) {
            logger.throwError("apiKey is invalid", logger_1.Logger.errors.INVALID_ARGUMENT, {
                argument: "apiKey",
                value: apiKey
            });
        }
        return apiKeyObj;
    }
    static getUrl(network, apiKey) {
        let endpoint = null;
        switch (network ? network.name : "unknown") {
            case "bsc-mainnet":
                endpoint = "bsc/mainnet";
                break;
            case "bsc-testnet":
                endpoint = "bsc/testnet";
                break;
            default:
                logger.throwError("unsupported network", logger_1.Logger.errors.INVALID_ARGUMENT, {
                    argument: "network",
                    value: network
                });
        }
        let url = `https://speedy-nodes-${apiKey.region}.moralis.io/${apiKey.apiKey}/${endpoint}`;
        const connection = { url };
        // Initialize empty headers
        connection.headers = {};
        return connection;
    }
    isCommunityResource() {
        return false;
    }
}
exports.BscMoralisProvider = BscMoralisProvider;
//# sourceMappingURL=bsc-moralis-provider.js.map