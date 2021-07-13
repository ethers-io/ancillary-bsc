import { BscscanProvider } from ".";

describe("Test BscscanProvider", function() {
    it("fetches a block", async function() {
        this.timeout(60000);
        const provider = new BscscanProvider();
        console.log(provider);
        console.log(await provider.getBlock(2));
        console.log(await provider.getTransaction("0x1d06a9d52255a2a4385d55093aec7671f3d7f6d83d4cd438991be8b6588e9b91"));
        console.log(await provider.getTransactionReceipt("0x1d06a9d52255a2a4385d55093aec7671f3d7f6d83d4cd438991be8b6588e9b91"));
    });
});
