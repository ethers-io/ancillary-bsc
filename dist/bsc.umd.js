(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('ethers')) :
    typeof define === 'function' && define.amd ? define(['exports', 'ethers'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global._ethers_bsc = {}, global.ethers));
}(this, (function (exports, ethers) { 'use strict';

    const version = "@ethers-ancillary/bsc@0.0.1";

    const logger$1 = new ethers.ethers.utils.Logger(version);
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
        return logger$1.throwArgumentError("network chainId mismatch", "network", network);
    }

    const logger = new ethers.ethers.utils.Logger(version);
    const defaultApiKey = "EVTS3CU31AATZV72YQ55TPGXGMVIFUQ9M9";
    class BscscanProvider extends ethers.ethers.providers.EtherscanProvider {
        constructor(network, apiKey) {
            const standardNetwork = getNetwork((network == null) ? "bsc-mainnet" : network);
            switch ((standardNetwork || {}).name) {
                case "bsc-mainnet":
                case "bsc-testnet":
                    break;
                default:
                    logger.throwError("unsupported network", ethers.ethers.utils.Logger.errors.UNSUPPORTED_OPERATION, {
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

    function getDefaultProvider(network, config) {
        const providers = [];
        providers.push(new BscscanProvider(network, (config || {}).bscscan || undefined));
        return new ethers.ethers.providers.FallbackProvider(providers);
    }

    exports.BscscanProvider = BscscanProvider;
    exports.getDefaultProvider = getDefaultProvider;
    exports.getNetwork = getNetwork;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
