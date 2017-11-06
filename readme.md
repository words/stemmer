# stemmer [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

[Porter stemming algorithm][source].

## API

Install:

```bash
npm install stemmer
```

Use:

```js
var stemmer = require('stemmer');

stemmer('considerations'); //=> 'consider'
stemmer('detestable'); //=> 'detest'
stemmer('vileness'); //=> 'vile'
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

## Related

*   [`stmr.c`](https://github.com/wooorm/stmr.c)
    — C API
*   [`stmr`](https://github.com/wooorm/stmr)
    — C CLI
*   [`lancaster-stemmer`](https://github.com/wooorm/lancaster-stemmer)
    — Lancaster stemming algorithm
*   [`double-metaphone`](https://github.com/wooorm/double-metaphone)
    — Double Metaphone implementation
*   [`soundex-code`](https://github.com/wooorm/soundex-code)
    — Fast Soundex implementation
*   [`dice-coefficient`](https://github.com/wooorm/dice-coefficient)
    — Sørensen–Dice coefficient
*   [`levenshtein-edit-distance`](https://github.com/wooorm/levenshtein-edit-distance)
    — Levenshtein edit distance
*   [`syllable`](https://github.com/wooorm/syllable)
    — Syllable count in an English word

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/words/stemmer.svg

[travis]: https://travis-ci.org/words/stemmer

[codecov-badge]: https://img.shields.io/codecov/c/github/words/stemmer.svg

[codecov]: https://codecov.io/github/words/stemmer

[license]: LICENSE

[author]: http://wooorm.com

[source]: http://tartarus.org/martin/PorterStemmer
