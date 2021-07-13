"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BscscanProvider = void 0;
const ethers_1 = require("ethers");
const networks_1 = require("./networks");
const _version_1 = require("./_version");
const logger = new ethers_1.ethers.utils.Logger(_version_1.version);
const defaultApiKey = "EVTS3CU31AATZV72YQ55TPGXGMVIFUQ9M9";
class BscscanProvider extends ethers_1.ethers.providers.EtherscanProvider {
    constructor(network, apiKey) {
        const standardNetwork = networks_1.getNetwork((network == null) ? "bsc-mainnet" : network);
        switch ((standardNetwork || {}).name) {
            case "bsc-mainnet":
            case "bsc-testnet":
                break;
            default:
                logger.throwError("unsupported network", ethers_1.ethers.utils.Logger.errors.UNSUPPORTED_OPERATION, {
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
exports.BscscanProvider = BscscanProvider;
//# sourceMappingURL=bscscan-provider.js.map