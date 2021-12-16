import { ConnectionInfo } from "@ethersproject/web";
import { Network, Networkish } from "@ethersproject/networks";
import { PocketProvider } from "@ethersproject/providers";
export declare class BscPocketProvider extends PocketProvider {
    constructor(network?: Networkish, apiKey?: any);
    static getUrl(network: Network, apiKey: any): ConnectionInfo;
    isCommunityResource(): boolean;
}
