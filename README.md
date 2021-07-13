Ancillary Package: Binance SmartChain (BSC)
===========================================

[![npm version](https://badge.fury.io/js/%40ethers-ancillary%2Fbsc.svg)](https://www.npmjs.com/package/@ethers-ancillary/bsc)

**Experimental:** This packages is still in the early stages
of the ancillary package template and the library has not
been thoroughly tested.

An ancillary package for the Binance Smart Chain (BSC).


Installing and Importing
------------------------

**Node**

```
/home/ricmoo> npm install @ethers-ancillary/bsc
```

```javascript
// JavaScript
const { BscscanProvider } = require("@ethers-ancillary/bsc");

// TypeScript
import { BscscanProvider } from "@ethers-ancillary/bsc";
```

**Browser**

Include the ESM module (ethers-bscscan-provider.esm.js) in the same folder as the
core library (i.e. ethers.esm.js) and import using:

```html
<script type="module">
  import { BscscanProvider } from "./ethers-bscscan-provider.esm.js";
</script>
```


Application Programming Interface (API)
---------------------------------------

**getDefaultProvider(networkish?)**

Create a new default provider connected to *networkish*, which may
be a chain name (i.e. `"bsc-mainnet"` or `"bsc-testnet`") or chain ID.

This will create a FallbackProvider, backed by all popular Third-Party
BSC services (currently only [Bsccsan](https://bscscan.com)).


**BscscanProvider**

The API for this provider is identical to the [EtherscanProvider](https://docs.ethers.io/v5/api/providers/api-providers/#EtherscanProvider),
except uses [bscscan.com](https://bscscan.com) (which is owned and operated by
the same company as Etherscan and has the same underlying API) as its source for
the BSC (Binance Smart Chain) network.

See [EtherscanProvider](https://docs.ethers.io/v5/api/providers/api-providers/#EtherscanProvider).


License
-------

MIT License.
