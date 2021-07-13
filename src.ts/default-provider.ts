import { ethers } from "ethers";

import { BscscanProvider } from "./bscscan-provider";


export function getDefaultProvider(network?: ethers.providers.Networkish, config?: Record<string, string>): ethers.providers.Provider {
    const providers: Array<ethers.providers.Provider> = [ ];

    providers.push(new BscscanProvider(network, (config || {}).bscscan || undefined));

    return new ethers.providers.FallbackProvider(providers);
}
