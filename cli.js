#!/usr/bin/env node
'use strict';

/*
 * Dependencies.
 */

var stemmer,
    pack;

pack = require('./package.json');
stemmer = require('./');

/*
 * Detect if a value is expected to be piped in.
 */

var expextPipeIn;

expextPipeIn = !process.stdin.isTTY;

/*
 * Arguments.
 */

var argv;

argv = process.argv.slice(2);

/*
 * Command.
 */

var command;

command = Object.keys(pack.bin)[0];

/**
 * Get the distance for a word.
 *
 * @param {Array.<string>} values
 * @return {string}
 */
function stems(values) {
    return values.map(stemmer).join(' ');
}

/**
 * Help.
 *
 * @return {string}
 */
function help() {
    return [
        '',
        'Usage: ' + command + ' [options] <words...>',
        '',
        pack.description,
        '',
        'Options:',
        '',
        '  -h, --help           output usage information',
        '  -v, --version        output version number',
        '',
        'Usage:',
        '',
        '# output stems',
        '$ ' + command + ' considerations',
        '# ' + stems(['considerations']),
        '',
        '# output stems from stdin',
        '$ echo "detestable vileness" | ' + command,
        '# ' + stems(['detestable', 'vileness']),
        ''
    ].join('\n  ') + '\n';
}

/**
 * Get the edit distance for a list containing one word.
 *
 * @param {Array.<string>} values
 */
function getStems(values) {
    if (values.length) {
        console.log(stems(values));
    } else {
        process.stderr.write(help());
        process.exit(1);
    }
}

/*
 * Program.
 */

if (
    argv.indexOf('--help') !== -1 ||
    argv.indexOf('-h') !== -1
) {
    console.log(help());
} else if (
    argv.indexOf('--version') !== -1 ||
    argv.indexOf('-v') !== -1
) {
    console.log(pack.version);
} else if (argv.length) {
    getStems(argv.join(' ').split(/\s+/g));
} else if (!expextPipeIn) {
    getStems([]);
} else {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (data) {
        getStems(data.trim().split(/\s+/g));
    });
}
