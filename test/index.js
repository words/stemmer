/**
 * @author Titus Wormer
 * @copyright 2014 Titus Wormer
 * @license MIT
 * @module stemmer
 * @fileoverview Test suite for `stemmer`.
 */

'use strict';

/* Dependencies. */
var fs = require('fs');
var path = require('path');
var PassThrough = require('stream').PassThrough;
var test = require('tape');
var execa = require('execa');
var version = require('../package').version;
var stemmer = require('..');

/* Fixtures. */
var inputs = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').split('\n');
var outputs = fs.readFileSync(path.join(__dirname, 'output.txt'), 'utf8').split('\n');

/* API. */
test('api', function (t) {
  inputs.forEach(function (input, index) {
    var output = outputs[index];
    t.equal(stemmer(input), output, '`' + input + '` == `' + output + '`');
  });

  t.end();
});

/* CLI. */
test('cli', function (t) {
  var input = new PassThrough();

  t.plan(7);

  execa.stdout('./cli.js', ['considerations']).then(function (result) {
    t.equal(result, 'consider', 'argument');
  });

  execa.stdout('./cli.js', ['detestable', 'vileness']).then(function (result) {
    t.equal(result, 'detest vile', 'arguments');
  });

  execa.stdout('./cli.js', {input: input}).then(function (result) {
    t.equal(result, 'detest vile', 'stdin');
  });

  input.write('detestable');

  setImmediate(function () {
    input.end(' vileness');
  });

  ['-h', '--help'].forEach(function (flag) {
    execa.stdout('./cli.js', [flag]).then(function (result) {
      t.ok(/\s+Usage: stemmer/.test(result), flag);
    });
  });

  ['-v', '--version'].forEach(function (flag) {
    execa.stdout('./cli.js', [flag]).then(function (result) {
      t.equal(result, version, flag);
    });
  });
});
