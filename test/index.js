import assert from 'node:assert'
import cp from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import {PassThrough} from 'node:stream'
import util from 'node:util'
import {URL} from 'node:url'
import test from 'node:test'
import {stemmer} from '../index.js'

const exec = util.promisify(cp.exec)

/** @type {Record<string, unknown>} */
const pack = JSON.parse(
  String(fs.readFileSync(new URL('../package.json', import.meta.url)))
)

const inputs = fs
  .readFileSync(path.join('test', 'input.txt'), 'utf8')
  .split('\n')
const outputs = fs
  .readFileSync(path.join('test', 'output.txt'), 'utf8')
  .split('\n')

test('api', function () {
  assert.doesNotThrow(function () {
    const length = inputs.length
    let index = -1
    while (++index < length) {
      assert.strictEqual(stemmer(inputs[index]), outputs[index])
    }
  }, 'should work for all fixtures')
})

test('cli', async function () {
  assert.deepEqual(
    await exec('./cli.js considerations'),
    {stdout: 'consider\n', stderr: ''},
    'one'
  )

  assert.deepEqual(
    await exec('./cli.js detestable vileness'),
    {stdout: 'detest vile\n', stderr: ''},
    'two'
  )

  await new Promise(function (resolve) {
    const input = new PassThrough()
    const subprocess = cp.exec('./cli.js', function (error, stdout, stderr) {
      assert.deepEqual(
        [error, stdout, stderr],
        [null, 'detest vile\n', ''],
        'stdin'
      )
    })
    assert(subprocess.stdin, 'expected stdin on `subprocess`')
    input.pipe(subprocess.stdin)
    input.write('detestable')
    setImmediate(function () {
      input.end(' vileness')
      setImmediate(resolve)
    })
  })

  const h = await exec('./cli.js -h')
  assert.ok(/\sUsage: stemmer/.test(h.stdout), '-h')

  const help = await exec('./cli.js --help')
  assert.ok(/\sUsage: stemmer/.test(help.stdout), '-h')

  assert.deepEqual(
    await exec('./cli.js -v'),
    {stdout: pack.version + '\n', stderr: ''},
    '-v'
  )

  assert.deepEqual(
    await exec('./cli.js --version'),
    {stdout: pack.version + '\n', stderr: ''},
    '--version'
  )
})
