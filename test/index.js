import assert from 'node:assert'
import {exec} from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import {PassThrough} from 'node:stream'
import {URL} from 'node:url'
import test from 'tape'
import {stemmer} from '../index.js'

/** @type {Object.<string, unknown>} */
var pack = JSON.parse(
  String(fs.readFileSync(new URL('../package.json', import.meta.url)))
)

var inputs = fs.readFileSync(path.join('test', 'input.txt'), 'utf8').split('\n')
var outputs = fs
  .readFileSync(path.join('test', 'output.txt'), 'utf8')
  .split('\n')

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
    t.deepEqual([error, stdout, stderr], [null, pack.version + '\n', ''], '-v')
  })

  exec('./cli.js --version', function (error, stdout, stderr) {
    t.deepEqual(
      [error, stdout, stderr],
      [null, pack.version + '\n', ''],
      '--version'
    )
  })
})
