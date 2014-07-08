'use strict';

/* eslint-disable no-cond-assign */

var fs, stemmer, source, natural, porterStemmer;

stemmer = require('..');
fs = require('fs');

try {
    porterStemmer = require('porter-stemmer').stemmer;
    natural = require('natural').PorterStemmer.stem;
} catch (error) {
    console.log(error);
    throw new Error(
        '\u001B[0;31m' +
        'The libraries needed by this benchmark could not be found. ' +
        'Please execute:\n' +
        '\tnpm run install-benchmark\n\n' +
        '\u001B[0m'
    );
}

source = fs.readFileSync('./spec/input.txt', 'utf-8')
    .split('\n')
    .slice(0, 1000);

suite('stemmer — this module', function () {
    bench('op/s * 1,000', function (next) {
        var iterator = -1,
            value;

        while (value = source[++iterator]) {
            stemmer(value);
        }

        next();
    });
});

suite('porterStemmer', function () {
    bench('op/s * 1,000', function (next) {
        var iterator = -1,
            value;

        while (value = source[++iterator]) {
            porterStemmer(value);
        }

        next();
    });
});

suite('natural - fails on 1229 out of 23532 unit tests', function () {
    bench('op/s * 1,000', function (next) {
        var iterator = -1,
            value;

        while (value = source[++iterator]) {
            natural(value);
        }

        next();
    });
});
