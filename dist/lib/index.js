#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _yargs = /*#__PURE__*/ _interop_require_default(require("yargs"));
const _helpers = require("yargs/helpers");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
(0, _yargs.default)((0, _helpers.hideBin)(process.argv)).scriptName(`create-design-system-component`).usage(`$0 <cmd> [args]`).command(``, ``, (yargs)=>{}, async function(argv) {}).demandCommand(2, ``).version(`0.0.1`).help().argv;

//# sourceMappingURL=index.js.map