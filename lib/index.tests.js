"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var assert_1 = __importDefault(require("assert"));
var ethers_1 = require("ethers");
var _1 = require(".");
var Tests = {
    Blocks: [
        {
            hash: "0xe9296d312a937cdefc201a8fe80dbfa8a9c958ada9e863ddbb324804722f1de0",
            parentHash: "0x04055304e432294a65ff31069c4d3092ff8b58f009cdb50eba5351e0332ad0f6",
            number: 2,
            timestamp: 1598671455,
            nonce: "0x0000000000000000",
            difficulty: 1,
            gasLimit: ethers_1.BigNumber.from("0x025ddfc1"),
            gasUsed: ethers_1.BigNumber.from("0x01fd0d"),
            miner: "0x9ef9f4360c606c7AB4db26b016007d3ad0aB86a0",
            extraData: "0xd883010002846765746888676f312e31332e34856c696e757800000000000000a12743737089564abf13a27ea94b80e57f2a0b13b8929f1bc4ced950f68e6c1271abda9bfc84182d90286a4e87a37382585dccc94d144585da0f2d7e11be979801",
            transactions: [
                "0x1d06a9d52255a2a4385d55093aec7671f3d7f6d83d4cd438991be8b6588e9b91"
            ]
        }
    ],
    Transactions: [
        {
            hash: "0x1d06a9d52255a2a4385d55093aec7671f3d7f6d83d4cd438991be8b6588e9b91",
            type: 0,
            accessList: null,
            blockHash: "0xe9296d312a937cdefc201a8fe80dbfa8a9c958ada9e863ddbb324804722f1de0",
            blockNumber: 2,
            transactionIndex: 0,
            from: "0x9ef9f4360c606c7AB4db26b016007d3ad0aB86a0",
            gasPrice: ethers_1.BigNumber.from("0x00"),
            gasLimit: ethers_1.BigNumber.from("0x7fffffffffffffff"),
            to: "0x0000000000000000000000000000000000001001",
            value: ethers_1.BigNumber.from("0x00"),
            nonce: 0,
            data: "0xc96be4cb0000000000000000000000002d4c407bbe49438ed859fe965b140dcf1aab71a9",
            r: "0xf440a61793afaa150924f2aa18dc92bc6f996faf7681b39288010f9467fbd0c2",
            s: "0x392c671957ff33ac30249fb8cf12f2dc10ba3edcf9a18078bf8c658c271a22ac",
            v: 147,
            creates: null,
            chainId: 56
        }
    ],
    TransactionReceipts: [
        {
            to: "0x0000000000000000000000000000000000001001",
            from: "0x9ef9f4360c606c7AB4db26b016007d3ad0aB86a0",
            contractAddress: null,
            transactionIndex: 0,
            gasUsed: ethers_1.BigNumber.from("0x01fd0d"),
            logsBloom: "0x00000000000000401000000000000000000000000000000000000000000000000000000002000000000000000000000000000200000080000000000000000000000000000000000000000000100004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
            blockHash: "0xe9296d312a937cdefc201a8fe80dbfa8a9c958ada9e863ddbb324804722f1de0",
            transactionHash: "0x1d06a9d52255a2a4385d55093aec7671f3d7f6d83d4cd438991be8b6588e9b91",
            logs: [
                {
                    transactionIndex: 0,
                    blockNumber: 2,
                    transactionHash: "0x1d06a9d52255a2a4385d55093aec7671f3d7f6d83d4cd438991be8b6588e9b91",
                    address: "0x0000000000000000000000000000000000001001",
                    topics: [
                        "0xddb6012116e51abf5436d956a4f0ebd927e92c576ff96d7918290c8782291e3e",
                        "0x0000000000000000000000002d4c407bbe49438ed859fe965b140dcf1aab71a9"
                    ],
                    data: "0x",
                    logIndex: 0,
                    blockHash: "0xe9296d312a937cdefc201a8fe80dbfa8a9c958ada9e863ddbb324804722f1de0"
                }
            ],
            blockNumber: 2,
            cumulativeGasUsed: ethers_1.BigNumber.from("0x01fd0d"),
            status: 1,
            type: 0,
            byzantium: true
        }
    ]
};
function _equals(path, actual, expected) {
    if (expected === null) {
        assert_1["default"].equal(actual, expected, "expected null: " + path + "!null");
    }
    else if (ethers_1.BigNumber.isBigNumber(expected)) {
        assert_1["default"].ok(ethers_1.BigNumber.isBigNumber(actual), "expected BigNumber instance: " + path + "!BigNumber");
        assert_1["default"].ok(expected.eq(actual), "BigNumber not equal: " + path + "!a.eq(e)");
    }
    else if (typeof (expected) === "object") {
        assert_1["default"].ok(typeof (actual) === "object", "expected object: " + path + "!object");
        for (var key in expected) {
            _equals(path + "@" + key + "/", actual[key], expected[key]);
        }
    }
    else if (Array.isArray(expected)) {
        assert_1["default"].ok(Array.isArray(actual), "expected an array: " + path + "!array");
        assert_1["default"].equal(expected.length, actual.length, "array length mismatch: " + path + "a.length!=e.length");
        expected.forEach(function (item, index) {
            _equals(path + "#" + index + "/", actual[index], expected[index]);
        });
    }
    else {
        assert_1["default"].equal(actual, expected, "not equal: " + path + "a!=b");
    }
}
function equals(actual, expected) {
    _equals("/", actual, expected);
    return true;
}
describe("Test BscscanProvider", function () {
    var provider = new _1.BscscanProvider();
    Tests.Blocks.forEach(function (test) {
        it("fetches block #" + test.number, function () {
            return __awaiter(this, void 0, void 0, function () {
                var block;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.timeout(60000);
                            return [4 /*yield*/, provider.getBlock(test.number)];
                        case 1:
                            block = _a.sent();
                            equals(block, test);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    Tests.Transactions.forEach(function (test) {
        it("fetches transaction: " + test.hash.substring(0, 10), function () {
            return __awaiter(this, void 0, void 0, function () {
                var tx;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.timeout(60000);
                            return [4 /*yield*/, provider.getTransaction(test.hash)];
                        case 1:
                            tx = _a.sent();
                            assert_1["default"].ok(typeof (tx.confirmations) === "number", "missing confirmations");
                            equals(tx, test);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    Tests.TransactionReceipts.forEach(function (test) {
        it("fetches transaction Receipt: " + test.transactionHash.substring(0, 10), function () {
            return __awaiter(this, void 0, void 0, function () {
                var receipt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.timeout(60000);
                            return [4 /*yield*/, provider.getTransactionReceipt(test.transactionHash)];
                        case 1:
                            receipt = _a.sent();
                            assert_1["default"].ok(typeof (receipt.confirmations) === "number", "missing confirmations");
                            equals(receipt, test);
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
//# sourceMappingURL=index.tests.js.map