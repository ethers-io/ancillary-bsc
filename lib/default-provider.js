"use strict";
exports.__esModule = true;
exports.getDefaultProvider = void 0;
var ethers_1 = require("ethers");
var bscscan_provider_1 = require("./bscscan-provider");
function getDefaultProvider(network, config) {
    var providers = [];
    providers.push(new bscscan_provider_1.BscscanProvider(network, (config || {}).bscscan || undefined));
    return new ethers_1.ethers.providers.FallbackProvider(providers);
}
exports.getDefaultProvider = getDefaultProvider;
//# sourceMappingURL=default-provider.js.map