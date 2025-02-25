#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
    .scriptName(`create-design-system-component`)
    .usage(`$0 <cmd> [args]`)
    .command(
        ``,
        ``,
        (yargs) => {

        },
        async function (argv) {
        },
    )
    .demandCommand(
        2,
        ``,
    )
    .version(`0.0.1`)
    .help().argv;
