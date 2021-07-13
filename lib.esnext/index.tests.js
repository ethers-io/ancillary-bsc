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
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe("Test BscscanProvider", function () {
    it("fetches a block", function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(60000);
            const provider = new _1.BscscanProvider();
            console.log(provider);
            console.log(yield provider.getBlock(2));
            console.log(yield provider.getTransaction("0x1d06a9d52255a2a4385d55093aec7671f3d7f6d83d4cd438991be8b6588e9b91"));
            console.log(yield provider.getTransactionReceipt("0x1d06a9d52255a2a4385d55093aec7671f3d7f6d83d4cd438991be8b6588e9b91"));
        });
    });
});
//# sourceMappingURL=index.tests.js.map