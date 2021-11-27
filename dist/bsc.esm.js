import { ethers } from 'ethers';
import { Logger } from '@ethersproject/logger';
import { PocketProvider, UrlJsonRpcProvider } from '@ethersproject/providers';
import '@ethersproject/properties';

const version = "@ethers-ancillary/bsc@0.0.1";

const logger$3 = new ethers.utils.Logger(version);
const networks = [
    {
        name: "bsc-mainnet",
        chainId: 0x38
    },
    {
        name: "bsc-testnet",
        chainId: 0x61
    },
];
function getNetwork(network) {
    if (network == null) {
        return null;
    }
    // Chain ID
    if (typeof (network) === "number") {
        const matches = networks.filter((n) => (n.chainId === network));
        if (matches.length) {
            return { name: matches[0].name, chainId: matches[0].chainId };
        }
        return {
            name: "unknown",
            chainId: network
        };
    }
    // Chain name
    if (typeof (network) === "string") {
        const matches = networks.filter((n) => (n.name === network));
        if (matches.length) {
            return { name: matches[0].name, chainId: matches[0].chainId };
        }
        return null;
    }
    if (typeof (network.name) === "string" && typeof (network.chainId) === "number") {
        const byName = getNetwork(network.name);
        const byChainId = getNetwork(network.chainId);
        // Nothing standard; valid custom network
        if (byName == null && byChainId == null) {
            return {
                name: network.name,
                chainId: network.chainId
            };
        }
        // Make sure if it is a standard chain the parameters match
        if (byName && byChainId && byName.name === byChainId.name && byName.chainId === byChainId.chainId) {
            return byName;
        }
    }
    return logger$3.throwArgumentError("network chainId mismatch", "network", network);
}

const logger$2 = new ethers.utils.Logger(version);
const defaultApiKey = "EVTS3CU31AATZV72YQ55TPGXGMVIFUQ9M9";
class BscscanProvider extends ethers.providers.EtherscanProvider {
    constructor(network, apiKey) {
        const standardNetwork = getNetwork((network == null) ? "bsc-mainnet" : network);
        switch ((standardNetwork || {}).name) {
            case "bsc-mainnet":
            case "bsc-testnet":
                break;
            default:
                logger$2.throwError("unsupported network", ethers.utils.Logger.errors.UNSUPPORTED_OPERATION, {
                    network
                });
        }
        super(standardNetwork, apiKey || defaultApiKey);
    }
    getBaseUrl() {
        switch (this.network ? this.network.name : "invalid") {
            case "bsc-mainnet":
                return "http:/\/api.bscscan.com";
            case "bsc-testnet":
                return "http:/\/api-testnet.bscscan.com";
        }
        return logger$2.throwArgumentError("unsupported network", "network", this.network);
    }
    isCommunityResource() {
        return (this.apiKey === defaultApiKey);
    }
}

const logger$1 = new Logger(version);
const defaultApplicationId = "6136201a7bad1500343e248d";
class BscPocketProvider extends PocketProvider {
    constructor(network, apiKey) {
        // We need a bit of creativity in the constructor because
        // Pocket uses different default API keys based on the network
        const n = getNetwork(!network ? "bsc-mainnet" : network);
        // If there was any issue above, we don't know this network
        if (!n) {
            logger$1.throwError("unsupported network", Logger.errors.INVALID_ARGUMENT, {
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
                logger$1.throwError("unsupported network", Logger.errors.INVALID_ARGUMENT, {
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

const logger = new Logger(version);
class BscMoralisProvider extends UrlJsonRpcProvider {
    constructor(network, apiKey) {
        const standardNetwork = getNetwork(!network ? "bsc-mainnet" : network);
        switch ((standardNetwork || {}).name) {
            case "bsc-mainnet":
            case "bsc-testnet":
                break;
            default:
                logger.throwError("unsupported network", Logger.errors.UNSUPPORTED_OPERATION, {
                    network
                });
        }
        if (apiKey == null) {
            logger.throwError("no default apiKey", Logger.errors.INVALID_ARGUMENT, {
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
            logger.throwError("apiKey is invalid", Logger.errors.INVALID_ARGUMENT, {
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
                logger.throwError("unsupported network", Logger.errors.INVALID_ARGUMENT, {
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

function getDefaultProvider(network, config) {
    const providers = [];
    providers.push(new BscscanProvider(network, (config || {}).bscscan || undefined));
    providers.push(new BscPocketProvider(network, (config || {}).bscpocket || undefined));
    if (config && config.bscmoralis && (typeof config.bscmoralis === "string" || config.bscmoralis.apiKey)) {
        providers.push(new BscMoralisProvider(network, config.bscmoralis));
    }
    return new ethers.providers.FallbackProvider(providers, Math.min(providers.length, 2));
}

export { BscMoralisProvider, BscPocketProvider, BscscanProvider, getDefaultProvider, getNetwork };
