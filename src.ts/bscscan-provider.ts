import { ethers } from "ethers";

import { getNetwork } from "./networks";

import { version } from "./_version";
const logger = new ethers.utils.Logger(version);

const defaultApiKey = "EVTS3CU31AATZV72YQ55TPGXGMVIFUQ9M9";

export class BscscanProvider extends ethers.providers.EtherscanProvider {

    constructor(network?: ethers.providers.Networkish, apiKey?: string) {
        const standardNetwork = getNetwork((network == null) ? "bsc-mainnet": network);

        switch((standardNetwork || {}).name) {
            case "bsc-mainnet":
            case "bsc-testnet":
                break;
            default:
                logger.throwError("unsupported network", ethers.utils.Logger.errors.UNSUPPORTED_OPERATION, {
                    network
                });
        }

        super(<ethers.providers.Network>standardNetwork, apiKey || defaultApiKey);
    }

    getBaseUrl(): string {
        switch (this.network ? this.network.name: "invalid") {
            case "bsc-mainnet":
                return "https:/\/api.bscscan.com";
            case "bsc-testnet":
                return "https:/\/api-testnet.bscscan.com";
        }

        return logger.throwArgumentError("unsupported network", "network", this.network);
    }

    isCommunityResource(): boolean {
        return (this.apiKey === defaultApiKey);
    }
}
