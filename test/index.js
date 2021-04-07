'use strict'

var fs = require('fs')
var path = require('path')
var assert = require('assert')
var exec = require('child_process').exec
var PassThrough = require('stream').PassThrough
var test = require('tape')
var version = require('../package').version
var stemmer = require('..')

var read = fs.readFileSync

var inputs = read(path.join('test', 'input.txt'), 'utf8').split('\n')
var outputs = read(path.join(__dirname, 'output.txt'), 'utf8').split('\n')

test('api', function (t) {
  t.doesNotThrow(function () {
    var length = inputs.length
    var index = -1
    while (++index < length) {
      assert.strictEqual(stemmer(inputs[index]), outputs[index])
    }
  }, 'should work for all fixtures')

  t.end()
})

test('cli', function (t) {
  var input = new PassThrough()

  t.plan(7)

  exec('./cli.js considerations', function (error, stdout, stderr) {
    t.deepEqual([error, stdout, stderr], [null, 'consider\n', ''], 'one')
  })

  exec('./cli.js detestable vileness', function (error, stdout, stderr) {
    t.deepEqual([error, stdout, stderr], [null, 'detest vile\n', ''], 'two')
  })

  var subprocess = exec('./cli.js', function (error, stdout, stderr) {
    t.deepEqual([error, stdout, stderr], [null, 'detest vile\n', ''], 'stdin')
  })

  input.pipe(subprocess.stdin)
  input.write('detestable')
  setImmediate(function () {
    input.end(' vileness')
  })

  exec('./cli.js -h', function (error, stdout, stderr) {
    t.deepEqual(
      [error, /\sUsage: stemmer/.test(stdout), stderr],
      [null, true, ''],
      '-h'
    )
  })

  exec('./cli.js --help', function (error, stdout, stderr) {
    t.deepEqual(
      [error, /\sUsage: stemmer/.test(stdout), stderr],
      [null, true, ''],
      '--help'
    )
  })

  exec('./cli.js -v', function (error, stdout, stderr) {
    t.deepEqual([error, stdout, stderr], [null, version + '\n', ''], '-v')
  })

  exec('./cli.js --version', function (error, stdout, stderr) {
    t.deepEqual(
      [error, stdout, stderr],
      [null, version + '\n', ''],
      '--version'
    )
  })
})
