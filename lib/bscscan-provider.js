"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.BscscanProvider = void 0;
var ethers_1 = require("ethers");
var networks_1 = require("./networks");
var _version_1 = require("./_version");
var logger = new ethers_1.ethers.utils.Logger(_version_1.version);
var defaultApiKey = "EVTS3CU31AATZV72YQ55TPGXGMVIFUQ9M9";
var BscscanProvider = /** @class */ (function (_super) {
    __extends(BscscanProvider, _super);
    function BscscanProvider(network, apiKey) {
        var _this = this;
        var standardNetwork = networks_1.getNetwork((network == null) ? "bsc-mainnet" : network);
        switch ((standardNetwork || {}).name) {
            case "bsc-mainnet":
            case "bsc-testnet":
                break;
            default:
                logger.throwError("unsupported network", ethers_1.ethers.utils.Logger.errors.UNSUPPORTED_OPERATION, {
                    network: network
                });
        }
        _this = _super.call(this, standardNetwork, apiKey || defaultApiKey) || this;
        return _this;
    }
    BscscanProvider.prototype.getBaseUrl = function () {
        switch (this.network ? this.network.name : "invalid") {
            case "bsc-mainnet":
                return "http:/\/api.bscscan.com";
            case "bsc-testnet":
                return "http:/\/api-testnet.bscscan.com";
        }
        return logger.throwArgumentError("unsupported network", "network", this.network);
    };
    BscscanProvider.prototype.isCommunityResource = function () {
        return (this.apiKey === defaultApiKey);
    };
    return BscscanProvider;
}(ethers_1.ethers.providers.EtherscanProvider));
exports.BscscanProvider = BscscanProvider;
//# sourceMappingURL=bscscan-provider.js.map