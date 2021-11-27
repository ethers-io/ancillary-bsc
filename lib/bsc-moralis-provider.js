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
exports.BscMoralisProvider = exports.BscMoralisWebSocketProvider = void 0;
var properties_1 = require("@ethersproject/properties");
var logger_1 = require("@ethersproject/logger");
var providers_1 = require("@ethersproject/providers");
var networks_1 = require("./networks");
var _version_1 = require("./_version");
var logger = new logger_1.Logger(_version_1.version);
var BscMoralisWebSocketProvider = /** @class */ (function (_super) {
    __extends(BscMoralisWebSocketProvider, _super);
    function BscMoralisWebSocketProvider(network, apiKey) {
        var _this = this;
        var provider = new BscMoralisProvider(network, apiKey);
        var connection = provider.connection;
        var url = connection.url.replace(/^http/i, "ws") + "/ws";
        _this = _super.call(this, url, network) || this;
        properties_1.defineReadOnly(_this, "apiKey", provider.apiKey);
        return _this;
    }
    BscMoralisWebSocketProvider.prototype.isCommunityResource = function () {
        return false;
    };
    return BscMoralisWebSocketProvider;
}(providers_1.WebSocketProvider));
exports.BscMoralisWebSocketProvider = BscMoralisWebSocketProvider;
var BscMoralisProvider = /** @class */ (function (_super) {
    __extends(BscMoralisProvider, _super);
    function BscMoralisProvider(network, apiKey) {
        var _this = this;
        var standardNetwork = networks_1.getNetwork(!network ? "bsc-mainnet" : network);
        switch ((standardNetwork || {}).name) {
            case "bsc-mainnet":
            case "bsc-testnet":
                break;
            default:
                logger.throwError("unsupported network", logger_1.Logger.errors.UNSUPPORTED_OPERATION, {
                    network: network
                });
        }
        if (apiKey == null) {
            logger.throwError("no default apiKey", logger_1.Logger.errors.INVALID_ARGUMENT, {
                argument: "apiKey",
                value: apiKey
            });
        }
        _this = _super.call(this, standardNetwork, apiKey) || this;
        return _this;
    }
    BscMoralisProvider.getApiKey = function (apiKey) {
        var apiKeyObj = {
            apiKey: null,
            region: "nyc"
        };
        if (typeof apiKey === "string") {
            apiKeyObj.apiKey = apiKey;
        }
        else {
            if (apiKey.apiKey != null) {
                apiKeyObj.apiKey = apiKey.apiKey;
            }
            if (apiKey.region != null) {
                apiKeyObj.region = apiKeyObj.region;
            }
        }
        if (apiKeyObj.apiKey == null) {
            logger.throwError("apiKey is invalid", logger_1.Logger.errors.INVALID_ARGUMENT, {
                argument: "apiKey",
                value: apiKey
            });
        }
        return apiKeyObj;
    };
    BscMoralisProvider.getUrl = function (network, apiKey) {
        var endpoint = null;
        switch (network ? network.name : "unknown") {
            case "bsc-mainnet":
                endpoint = "bsc/mainnet";
                break;
            case "bsc-testnet":
                endpoint = "bsc/testnet";
                break;
            default:
                logger.throwError("unsupported network", logger_1.Logger.errors.INVALID_ARGUMENT, {
                    argument: "network",
                    value: network
                });
        }
        var url = "https://speedy-nodes-" + apiKey.region + ".moralis.io/" + apiKey.apiKey + "/" + endpoint;
        var connection = { url: url };
        // Initialize empty headers
        connection.headers = {};
        return connection;
    };
    BscMoralisProvider.prototype.isCommunityResource = function () {
        return false;
    };
    return BscMoralisProvider;
}(providers_1.UrlJsonRpcProvider));
exports.BscMoralisProvider = BscMoralisProvider;
//# sourceMappingURL=bsc-moralis-provider.js.map