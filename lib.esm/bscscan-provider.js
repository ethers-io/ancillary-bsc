import { ethers } from "ethers";
import { getNetwork } from "./networks";
import { version } from "./_version";
const logger = new ethers.utils.Logger(version);
const defaultApiKey = "EVTS3CU31AATZV72YQ55TPGXGMVIFUQ9M9";
export class BscscanProvider extends ethers.providers.EtherscanProvider {
    constructor(network, apiKey) {
        const standardNetwork = getNetwork((network == null) ? "bsc-mainnet" : network);
        switch ((standardNetwork || {}).name) {
            case "bsc-mainnet":
            case "bsc-testnet":
                break;
            default:
                logger.throwError("unsupported network", ethers.utils.Logger.errors.UNSUPPORTED_OPERATION, {
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
        return logger.throwArgumentError("unsupported network", "network", this.network);
    }
    isCommunityResource() {
        return (this.apiKey === defaultApiKey);
    }
}
//# sourceMappingURL=bscscan-provider.js.map