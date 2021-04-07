import assert from 'assert'
import {exec} from 'child_process'
import fs from 'fs'
import path from 'path'
import {PassThrough} from 'stream'
import {URL} from 'url'
import {stemmer} from '../index.js'
import test from 'tape'

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
