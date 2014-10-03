'use strict';

/**
 * Dependencies.
 */

var stemmer,
    assert,
    fs;

stemmer = require('..');
assert = require('assert');
fs = require('fs');

/**
 * Fixtures.
 */

var inputs,
    outputs;

inputs = fs.readFileSync('./spec/input.txt', 'utf-8').split('\n');
outputs = fs.readFileSync('./spec/output.txt', 'utf-8').split('\n');

/**
 * Tests.
 */

describe('stemmer()', function () {
    it('should be a `function`', function () {
        assert(typeof stemmer === 'function');
    });
});

describe('stemming', function () {
    var index;

    function assertStem(input, output) {
        it('should stem `' + input + '` to `' + output + '`', function () {
            assert(stemmer(input) === output);
        });
    }

    index = -1;

    while (inputs[++index]) {
        assertStem(inputs[index], outputs[index]);
    }
});
