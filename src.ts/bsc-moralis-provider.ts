import { ConnectionInfo } from "@ethersproject/web";
import { Network, Networkish } from "@ethersproject/networks";
import { defineReadOnly } from "@ethersproject/properties";
import { Logger } from "@ethersproject/logger";
import { UrlJsonRpcProvider, WebSocketProvider, CommunityResourcable } from "@ethersproject/providers";
import { getNetwork } from "./networks";
import { version } from "./_version";

const logger = new Logger(version);

export class BscMoralisWebSocketProvider extends WebSocketProvider implements CommunityResourcable {
    readonly apiKey: string | undefined;

    constructor(network?: Networkish, apiKey?: any) {
        const provider = new BscMoralisProvider(network, apiKey);
        const connection = provider.connection;

        const url = `${connection.url.replace(/^http/i, "ws")}/ws`;
        super(url, network);

        defineReadOnly(this, "apiKey", provider.apiKey);
    }

    isCommunityResource(): boolean {
        return false;
    }
}

export class BscMoralisProvider extends UrlJsonRpcProvider {
    constructor(network?: Networkish, apiKey?: any) {
        const standardNetwork = getNetwork(!network ? "bsc-mainnet": network);

        switch((standardNetwork || {}).name) {
            case "bsc-mainnet":
            case "bsc-testnet":
                break;
            default:
                logger.throwError("unsupported network", Logger.errors.UNSUPPORTED_OPERATION, {
                    network
                });
        }

        if(apiKey == null) {
            logger.throwError("no default apiKey", Logger.errors.INVALID_ARGUMENT, {
                argument: "apiKey",
                value: apiKey
            });
        }

        super(<Network>standardNetwork, apiKey);
    }

    static getApiKey(apiKey: any): any {
        const apiKeyObj: { apiKey: string | null, region: string } = {
            apiKey: null,
            region: "nyc"
        };

        if (typeof apiKey === "string") {
            apiKeyObj.apiKey = apiKey;
        } else {
            if (apiKey.apiKey != null) {
                apiKeyObj.apiKey = apiKey.apiKey;
            }

            if(apiKey.region != null) {
                apiKeyObj.region = apiKeyObj.region
            }
        }

        if(apiKeyObj.apiKey == null) {
            logger.throwError("apiKey is invalid", Logger.errors.INVALID_ARGUMENT, {
                argument: "apiKey",
                value: apiKey
            });
        }

        return apiKeyObj;
    }

    static getUrl(network: Network, apiKey: any): ConnectionInfo {
        let endpoint: string | null = null;
        switch (network ? network.name : "unknown") {
            case "bsc-mainnet":
                endpoint = "bsc/mainnet"
                break
            case "bsc-testnet":
                endpoint = "bsc/testnet"
                break
            default:
                logger.throwError("unsupported network", Logger.errors.INVALID_ARGUMENT, {
                    argument: "network",
                    value: network
                });
        }

        let url = `https://speedy-nodes-${apiKey.region}.moralis.io/${apiKey.apiKey}/${endpoint}`

        const connection: ConnectionInfo = { url };

        // Initialize empty headers
        connection.headers = {}

        return connection;
    }

    isCommunityResource(): boolean {
        return false;
    }
}