import { ethers } from "ethers";

import { BscMoralisProvider } from "./bsc-moralis-provider";
import { BscPocketProvider } from "./bsc-pocket-provider";
import { BscscanProvider } from "./bscscan-provider";


export function getDefaultProvider(network?: ethers.providers.Networkish, config?: Record<string, any>): ethers.providers.Provider {
    const providers: Array<ethers.providers.Provider> = [ ];

    providers.push(new BscscanProvider(network, (config || {}).bscscan || undefined));

    providers.push(new BscPocketProvider(network, (config || {}).bscpocket || undefined));

    if(config && config.bscmoralis && (typeof config.bscmoralis === "string" || config.bscmoralis.apiKey)) {
        providers.push(new BscMoralisProvider(network, config.bscmoralis));
    }

    return new ethers.providers.FallbackProvider(providers, Math.min(providers.length, 2));
}
