/**
 *  rollup.config.js
 *
 *  This file is used by rollup to generate distribution
 *  files in the `dist/` folder which can be used without
 *  mondification by placing all ethers libraries and
 *  ancillary packages in the same folder.
 *
 *  The package name is determined from the package name,
 *  for example a package named `@ethers-ancillary/foobar`
 *  will contain the following in the `dist/` folder:
 *   - foobar.esm.js
 *   - foobar.esm.min.js
 *   - foobar.umd.js
 *   - foobar.umd.min.js
 *
 */

//import commonjs from '@rollup/plugin-commonjs';
//import inject from "@rollup/plugin-inject";
//import resolveNode from "@rollup/plugin-node-resolve";
//import nodePolyfills from "rollup-plugin-node-polyfills";

import { terser } from "rollup-plugin-terser";

// Get the library name based on the package name.
// Semi-official packages managed in the npm @ethers-ancillary
// namespace are managed in the ethers-io GitHub account, and
// must NOT begin with `ext-`. Any other package will be prefixed
// with `ext-` to prevent name collisions of external packages
// with the semi-official packages.
const libName = (function() {
    let libName = require("./package.json").name.toLowerCase();

    // Check for semi-official @ethers-ancillary packages
    const match = libName.match(/^@ethers-ancillary\/([a-z][a-z0-9-]*)$/);
    if (match) {
        if (match[1].substring(0, 4) !== "ext-") { return match[1]; }
    } else {
        const compName = libName.split("/").pop();
        if (compName.match(/^[a-z][a-z0-9]*$/)) { return "ext-" + compName; }
    }

    throw new Error(`package does not follow naming convention: ${ JSON.stringify(libName) }`);
})();

// Replaces ES2015 import statements with relative paths so things
// work in browsers. For example, with `targets={ ethers: "./ethers.js" }`
//   import { ethers } from "ethers";
// becomes:
//   import { ethers } from "./ethers.js";
function reanchorPlugin(targets) {
    const matcher = /import(\s*\{[a-z0-9_\s,$]*\}\s*|(\s+[a-z0-9_$\s]*\s+))from\s*(['"]([^'"]*)['"]);/gi;
    function update(code) {
        code = code.replace(matcher, (all, imps, _imps, source) => {
            const imp = source.substring(1, source.length - 1)
            const repl = targets[imp];
            if (repl) {
                console.log(`Re-anchoring ${ imp } to ${ repl }`);
                const quote = source[0];
                return `import ${ imps } from ${ quote }${ repl }${ quote };`;
            }
            return all;
        });
        return code;
    }

    return {
        name: "reanchor",
        async generateBundle(output, bundle) {
            for (const name in bundle) {
                bundle[name].code = update(bundle[name].code);
            }
        }
    };
}

function camelCase(text) {
    const words = text.split(/[^a-z0-9]+/);
    const result = words.map((word, index) => {
        word = word.toLowerCase();
        if (index > 0) { word = word[0].toUpperCase() + word.substring(1); }
        return word
    }).join("");
    if (result.length === 0) { throw new Error(`invalid text for camelCase: ${ JSON.stringify(text) }`); }
    return result;
}

// Create each config
function getConfig(input, format, minify) {

    const plugins = [
//        inject({ Buffer: [ "buffer-es6", "Buffer" ], }),
//        commonjs({ mainFields: [ "module", "browser", "main" ] }),
//        nodePolyfills({ }),
//        resolveNode({ preferBuiltins: false })
    ];

    let name = undefined;
    if (format === "esm") {
        plugins.push({
          "ethers": "./ethers.esm.min.js"
        });
    } else {
        name = `_ethers_${ camelCase(libName) }`;
    }

    const comps = [ `./dist/${ libName }`, format ];

    if (minify) {
        comps.push("min");
        plugins.push(terser());
    }

    comps.push("js");

    return {
      input: input,
      output: {
        file: comps.join("."),
        name,
        format,
//        globals
      },
      context: "window",
//      treeshake: false,
//      treeshake: true,
      external: [ "ethers" ],
      plugins: plugins
  };
}

// The complete list of generated dist files
module.exports = [
    getConfig("./lib.esm/index.js", "umd"),
    getConfig("./lib.esm/index.js", "umd", true),
    getConfig("./lib.esm/index.js", "esm"),
    getConfig("./lib.esm/index.js", "esm", true)
];
