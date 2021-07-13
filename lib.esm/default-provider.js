import { ethers } from "ethers";
import { BscscanProvider } from "./bscscan-provider";
export function getDefaultProvider(network, config) {
    const providers = [];
    providers.push(new BscscanProvider(network, (config || {}).bscscan || undefined));
    return new ethers.providers.FallbackProvider(providers);
}
//# sourceMappingURL=default-provider.js.map