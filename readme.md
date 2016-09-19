# stemmer [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

[Porter stemming algorithm][source].

> **Check out [`stmr.c`][c] for a faster version, in C.**

## API

Install:

```bash
npm install stemmer
```

Use:

```js
var stemmer = require('stemmer');

stemmer('considerations'); // 'consider'
stemmer('detestable'); // 'detest'
stemmer('vileness'); // 'vile'
```

## CLI

Install:

```sh
npm install -g stemmer
```

Use:

```txt
Usage: stemmer [options] <words...>

Porter Stemmer algorithm

Options:

  -h, --help           output usage information
  -v, --version        output version number

Usage:

# output stems
$ stemmer considerations
# consider

# output stems from stdin
$ echo "detestable vileness" | stemmer
# detest vile
```

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/stemmer.svg

[travis]: https://travis-ci.org/wooorm/stemmer

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/stemmer.svg

[codecov]: https://codecov.io/github/wooorm/stemmer

[license]: LICENSE

[author]: http://wooorm.com

[c]: https://github.com/wooorm/stmr.c

[source]: http://tartarus.org/martin/PorterStemmer
