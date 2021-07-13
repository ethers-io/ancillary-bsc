"use strict";
exports.__esModule = true;
exports.getNetwork = void 0;
var ethers_1 = require("ethers");
var _version_1 = require("./_version");
var logger = new ethers_1.ethers.utils.Logger(_version_1.version);
var networks = [
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
        var matches = networks.filter(function (n) { return (n.chainId === network); });
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
        var matches = networks.filter(function (n) { return (n.name === network); });
        if (matches.length) {
            return { name: matches[0].name, chainId: matches[0].chainId };
        }
        return null;
    }
    if (typeof (network.name) === "string" && typeof (network.chainId) === "number") {
        var byName = getNetwork(network.name);
        var byChainId = getNetwork(network.chainId);
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
    return logger.throwArgumentError("network chainId mismatch", "network", network);
}
exports.getNetwork = getNetwork;
//# sourceMappingURL=networks.js.map