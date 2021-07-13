"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultProvider = void 0;
const ethers_1 = require("ethers");
const bscscan_provider_1 = require("./bscscan-provider");
function getDefaultProvider(network, config) {
    const providers = [];
    providers.push(new bscscan_provider_1.BscscanProvider(network, (config || {}).bscscan || undefined));
    return new ethers_1.ethers.providers.FallbackProvider(providers);
}
exports.getDefaultProvider = getDefaultProvider;
//# sourceMappingURL=default-provider.js.map