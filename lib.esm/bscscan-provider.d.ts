import { ethers } from "ethers";
export declare class BscscanProvider extends ethers.providers.EtherscanProvider {
    constructor(network?: ethers.providers.Networkish, apiKey?: string);
    getBaseUrl(): string;
    isCommunityResource(): boolean;
}
