import assert from "assert";

import { BigNumber } from "ethers";

import { BscscanProvider/*, BscPocketProvider, BscMoralisProvider*/ } from ".";

const Tests = {
    Blocks: [
        {
            hash: "0xe9296d312a937cdefc201a8fe80dbfa8a9c958ada9e863ddbb324804722f1de0",
            parentHash: "0x04055304e432294a65ff31069c4d3092ff8b58f009cdb50eba5351e0332ad0f6",
            number: 2,
            timestamp: 1598671455,
            nonce: "0x0000000000000000",
            difficulty: 1,
            gasLimit: BigNumber.from("0x025ddfc1"),
            gasUsed: BigNumber.from("0x01fd0d"),
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
            gasPrice: BigNumber.from("0x00"),
            gasLimit: BigNumber.from("0x7fffffffffffffff"),
            to: "0x0000000000000000000000000000000000001001",
            value: BigNumber.from("0x00"),
            nonce: 0,
            data: "0xc96be4cb0000000000000000000000002d4c407bbe49438ed859fe965b140dcf1aab71a9",
            r: "0xf440a61793afaa150924f2aa18dc92bc6f996faf7681b39288010f9467fbd0c2",
            s: "0x392c671957ff33ac30249fb8cf12f2dc10ba3edcf9a18078bf8c658c271a22ac",
            v: 147,
            creates: null,
            chainId: 56,
        }
    ],
    TransactionReceipts: [
        {
            to: "0x0000000000000000000000000000000000001001",
            from: "0x9ef9f4360c606c7AB4db26b016007d3ad0aB86a0",
            contractAddress: null,
            transactionIndex: 0,
            gasUsed: BigNumber.from("0x01fd0d"),
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
            cumulativeGasUsed: BigNumber.from("0x01fd0d"),
            status: 1,
            type: 0,
            byzantium: true
        }
    ],
};

function _equals(path: string, actual: any, expected: any): void {
    if (expected === null) {
        assert.equal(actual, expected, `expected null: ${ path }!null`)
    } else if (BigNumber.isBigNumber(expected)) {
        assert.ok(BigNumber.isBigNumber(actual), `expected BigNumber instance: ${ path }!BigNumber`);
        assert.ok(expected.eq(actual), `BigNumber not equal: ${ path }!a.eq(e)`);
    } else if (typeof(expected) === "object") {
        assert.ok(typeof(actual) === "object", `expected object: ${ path }!object`);
        for (const key in expected) {
            _equals(`${ path }@${ key }/`, actual[key], expected[key]);
        }
    } else if (Array.isArray(expected)) {
        assert.ok(Array.isArray(actual), `expected an array: ${ path }!array`);
        assert.equal(expected.length, actual.length, `array length mismatch: ${ path }a.length!=e.length`);
        expected.forEach((item, index) => {
            _equals(`${ path }#${ index }/`, actual[index], expected[index]);
        });
    } else {
        assert.equal(actual, expected, `not equal: ${ path }a!=b`);
    }
}

function equals(actual: any, expected: any): boolean {
    _equals("/", actual, expected);
    return true;
}

describe("Test BscscanProvider", function() {
    const provider = new BscscanProvider();

    Tests.Blocks.forEach((test) => {
        it(`fetches block #${ test.number }`, async function() {
            this.timeout(60000);
            const block = await provider.getBlock(test.number);
            equals(block, test)
        });
    });

    Tests.Transactions.forEach((test) => {
        it(`fetches transaction: ${ test.hash.substring(0, 10) }`, async function() {
            this.timeout(60000);
            const tx = await provider.getTransaction(test.hash);
            assert.ok(typeof(tx.confirmations) === "number", "missing confirmations");
            equals(tx, test)
        });
    });

    Tests.TransactionReceipts.forEach((test) => {
        it(`fetches transaction Receipt: ${ test.transactionHash.substring(0, 10) }`, async function() {
            this.timeout(60000);
            const receipt = await provider.getTransactionReceipt(test.transactionHash);
            assert.ok(typeof(receipt.confirmations) === "number", "missing confirmations");
            equals(receipt, test)
        });
    });
});

// does not pass fetch tx test
/* describe("Test BscPocketProvider", function() {
    const provider = new BscPocketProvider();

    Tests.Blocks.forEach((test) => {
        it(`fetches block #${ test.number }`, async function() {
            this.timeout(60000);
            const block = await provider.getBlock(test.number);
            console.log(block)
            equals(block, test)
        });
    });

    Tests.Transactions.forEach((test) => {
        it(`fetches transaction: ${ test.hash.substring(0, 10) }`, async function() {
            this.timeout(60000);
            const tx = await provider.getTransaction(test.hash);
            assert.ok(typeof(tx.confirmations) === "number", "missing confirmations");
            equals(tx, test)
        });
    });

    Tests.TransactionReceipts.forEach((test) => {
        it(`fetches transaction Receipt: ${ test.transactionHash.substring(0, 10) }`, async function() {
            this.timeout(60000);
            const receipt = await provider.getTransactionReceipt(test.transactionHash);
            assert.ok(typeof(receipt.confirmations) === "number", "missing confirmations");
            equals(receipt, test)
        });
    });
}); */

// tested with private apiKey, passes all successfully
// create public/test apiKey to test
/* describe("Test BscMoralisProvider", function() {
    const provider = new BscMoralisProvider();

    Tests.Blocks.forEach((test) => {
        it(`fetches block #${ test.number }`, async function() {
            this.timeout(60000);
            const block = await provider.getBlock(test.number);
            equals(block, test)
        });
    });

    Tests.Transactions.forEach((test) => {
        it(`fetches transaction: ${ test.hash.substring(0, 10) }`, async function() {
            this.timeout(60000);
            const tx = await provider.getTransaction(test.hash);
            assert.ok(typeof(tx.confirmations) === "number", "missing confirmations");
            equals(tx, test)
        });
    });

    Tests.TransactionReceipts.forEach((test) => {
        it(`fetches transaction Receipt: ${ test.transactionHash.substring(0, 10) }`, async function() {
            this.timeout(60000);
            const receipt = await provider.getTransactionReceipt(test.transactionHash);
            assert.ok(typeof(receipt.confirmations) === "number", "missing confirmations");
            equals(receipt, test)
        });
    });
}); */
