#!/usr/bin/env node
import fs from 'fs'
import {URL} from 'url'
import {stemmer} from './index.js'

/** @type {Object.<string, unknown>} */
var pack = JSON.parse(
  String(fs.readFileSync(new URL('./package.json', import.meta.url)))
)

var argv = process.argv.slice(2)

if (argv.includes('--help') || argv.includes('-h')) {
  console.log(help())
} else if (argv.includes('--version') || argv.includes('-v')) {
  console.log(pack.version)
} else if (argv.length === 0) {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', function (data) {
    console.log(stem(String(data)))
  })
} else {
  console.log(stem(argv.join(' ')))
}

/**
 * @param {string} values
 * @returns {string}
 */
function stem(values) {
  return values
    .split(/\s+/g)
    .map((d) => stemmer(d))
    .join(' ')
}

function help() {
  return (
    [
      '',
      'Usage: ' + pack.name + ' [options] <words...>',
      '',
      pack.description,
      '',
      'Options:',
      '',
      '  -h, --help           output usage information',
      '  -v, --version        output version number',
      '',
      'Usage:',
      '',
      '# output stemmerality',
      '$ ' + pack.name + ' @',
      '# ' + stemmer('@'),
      '',
      '# output stemmerality from stdin',
      "$ echo 'الانجليزية' | " + pack.name,
      '# ' + stemmer('الانجليزية')
    ].join('\n  ') + '\n'
  )
}
