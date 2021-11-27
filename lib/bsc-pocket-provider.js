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
exports.BscPocketProvider = void 0;
var logger_1 = require("@ethersproject/logger");
var providers_1 = require("@ethersproject/providers");
var networks_1 = require("./networks");
var _version_1 = require("./_version");
var logger = new logger_1.Logger(_version_1.version);
var defaultApplicationId = "6136201a7bad1500343e248d";
var BscPocketProvider = /** @class */ (function (_super) {
    __extends(BscPocketProvider, _super);
    function BscPocketProvider(network, apiKey) {
        // We need a bit of creativity in the constructor because
        // Pocket uses different default API keys based on the network
        var _this = this;
        var n = networks_1.getNetwork(!network ? "bsc-mainnet" : network);
        // If there was any issue above, we don't know this network
        if (!n) {
            logger.throwError("unsupported network", logger_1.Logger.errors.INVALID_ARGUMENT, {
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
        _this = _super.call(this, n, apiKey) || this;
        return _this;
    }
    BscPocketProvider.getUrl = function (network, apiKey) {
        var host = null;
        switch (network ? network.name : "unknown") {
            case "bsc-mainnet":
                host = "bsc-mainnet.gateway.pokt.network";
                break;
            default:
                logger.throwError("unsupported network", logger_1.Logger.errors.INVALID_ARGUMENT, {
                    argument: "network",
                    value: network
                });
        }
        var url = "https://" + host + "/v1/lb/" + apiKey.applicationId;
        var connection = { url: url };
        // Initialize empty headers
        connection.headers = {};
        // Apply application secret key
        if (apiKey.applicationSecretKey != null) {
            connection.user = "";
            connection.password = apiKey.applicationSecretKey;
        }
        return connection;
    };
    BscPocketProvider.prototype.isCommunityResource = function () {
        return (this.applicationId === defaultApplicationId);
    };
    return BscPocketProvider;
}(providers_1.PocketProvider));
exports.BscPocketProvider = BscPocketProvider;
//# sourceMappingURL=bsc-pocket-provider.js.map