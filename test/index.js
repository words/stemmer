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
  var helps = ['-h', '--help']
  var versions = ['-v', '--version']

  t.plan(7)

  exec('./cli.js considerations', function(err, stdout, stderr) {
    t.deepEqual([err, stdout, stderr], [null, 'consider\n', ''], 'one')
  })

  exec('./cli.js detestable vileness', function(err, stdout, stderr) {
    t.deepEqual([err, stdout, stderr], [null, 'detest vile\n', ''], 'two')
  })

  var subprocess = exec('./cli.js', function(err, stdout, stderr) {
    t.deepEqual([err, stdout, stderr], [null, 'detest vile\n', ''], 'stdin')
  })

  input.pipe(subprocess.stdin)
  input.write('detestable')
  setImmediate(function() {
    input.end(' vileness')
  })

  helps.forEach(function(flag) {
    exec('./cli.js ' + flag, function(err, stdout, stderr) {
      t.deepEqual(
        [err, /\sUsage: stemmer/.test(stdout), stderr],
        [null, true, ''],
        flag
      )
    })
  })

  versions.forEach(function(flag) {
    exec('./cli.js ' + flag, function(err, stdout, stderr) {
      t.deepEqual([err, stdout, stderr], [null, version + '\n', ''], flag)
    })
  })
})
