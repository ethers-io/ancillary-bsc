import { ConnectionInfo } from "@ethersproject/web";
import { Network, Networkish } from "@ethersproject/networks";
import { UrlJsonRpcProvider, WebSocketProvider, CommunityResourcable } from "@ethersproject/providers";
export declare class BscMoralisWebSocketProvider extends WebSocketProvider implements CommunityResourcable {
    readonly apiKey: string | undefined;
    constructor(network?: Networkish, apiKey?: any);
    isCommunityResource(): boolean;
}
export declare class BscMoralisProvider extends UrlJsonRpcProvider {
    constructor(network?: Networkish, apiKey?: any);
    static getApiKey(apiKey: any): any;
    static getUrl(network: Network, apiKey: any): ConnectionInfo;
    isCommunityResource(): boolean;
}
