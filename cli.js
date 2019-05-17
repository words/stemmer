#!/usr/bin/env node
'use strict'

var pack = require('./package.json')
var stemmer = require('.')

var argv = process.argv.slice(2)

if (argv.indexOf('--help') !== -1 || argv.indexOf('-h') !== -1) {
  console.log(help())
} else if (argv.indexOf('--version') !== -1 || argv.indexOf('-v') !== -1) {
  console.log(pack.version)
} else if (argv.length === 0) {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', function(data) {
    console.log(stem(data))
  })
} else {
  console.log(stem(argv.join(' ')))
}

function stem(values) {
  return values
    .split(/\s+/g)
    .map(stemmer)
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
