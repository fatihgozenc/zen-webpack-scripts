#! /usr/bin/env node

/**
 * This is CLI initializer of the Goldeneye
 * It parses commands and runs functions in ./cmds folder
 */

require('yargs/yargs')(process.argv.slice(2))
    .commandDir('bin')
    .demandCommand()
    .help()
    .argv;
