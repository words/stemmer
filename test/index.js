'use strict'

var fs = require('fs')
var path = require('path')
var assert = require('assert')
var PassThrough = require('stream').PassThrough
var test = require('tape')
var execa = require('execa')
var pack = require('../package')
var stemmer = require('..')

var read = fs.readFileSync

var inputs = read(path.join('test', 'input.txt'), 'utf8').split('\n')
var outputs = read(path.join(__dirname, 'output.txt'), 'utf8').split('\n')

test('api', function(t) {
  t.doesNotThrow(function() {
    var length = inputs.length
    var index = -1
    while (++index < length) {
      assert.strictEqual(stemmer(inputs[index]), outputs[index])
    }
  }, 'should work for all fixtures')

  t.end()
})

test('cli', function(t) {
  var input = new PassThrough()
  var help = ['-h', '--help']
  var version = ['-v', '--version']

  t.plan(7)

  execa.stdout('./cli.js', ['considerations']).then(function(result) {
    t.equal(result, 'consider', 'argument')
  })

  execa.stdout('./cli.js', ['detestable', 'vileness']).then(function(result) {
    t.equal(result, 'detest vile', 'arguments')
  })

  execa.stdout('./cli.js', {input: input}).then(function(result) {
    t.equal(result, 'detest vile', 'stdin')
  })

  input.write('detestable')

  setImmediate(function() {
    input.end(' vileness')
  })

  help.forEach(function(flag) {
    execa.stdout('./cli.js', [flag]).then(function(result) {
      t.ok(/\s+Usage: stemmer/.test(result), flag)
    })
  })

  version.forEach(function(flag) {
    execa.stdout('./cli.js', [flag]).then(function(result) {
      t.equal(result, pack.version, flag)
    })
  })
})
