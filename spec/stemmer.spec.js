'use strict';

var stemmer, assert, fs, inputs, outputs, iterator;

stemmer = require('..');
assert = require('assert');
fs = require('fs');

describe('stemmer()', function () {
    it('should be of type `function`', function () {
        assert(typeof stemmer === 'function');
    });
});

inputs = fs.readFileSync('./spec/input.txt', 'utf-8').split('\n');
outputs = fs.readFileSync('./spec/output.txt', 'utf-8').split('\n');
iterator = -1;

function assertStem(input, output) {
    it('should stem `' + input + '` to `' + output + '`', function () {
        assert(stemmer(input) === output);
    });
}

describe('stemming', function () {
    while (inputs[++iterator]) {
        assertStem(inputs[iterator], outputs[iterator]);
    }
});
