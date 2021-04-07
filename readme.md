# stemmer

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

[Porter stemming algorithm][source].

## Install

This package is ESM only: Node 12+ is needed to use it and it must be `import`ed
instead of `require`d.

[npm][]:

```sh
npm install stemmer
```

## API

This package exports the following identifiers: `stemmer`.
There is no default export.

```js
import {stemmer} from 'stemmer'

stemmer('considerations') // => 'consider'
stemmer('detestable') // => 'detest'
stemmer('vileness') // => 'vile'
```

## CLI

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
*   [`lancaster-stemmer`](https://github.com/words/lancaster-stemmer)
    — Lancaster stemming algorithm
*   [`double-metaphone`](https://github.com/words/double-metaphone)
    — Double Metaphone implementation
*   [`soundex-code`](https://github.com/words/soundex-code)
    — Fast Soundex implementation
*   [`dice-coefficient`](https://github.com/words/dice-coefficient)
    — Sørensen–Dice coefficient
*   [`levenshtein-edit-distance`](https://github.com/words/levenshtein-edit-distance)
    — Levenshtein edit distance
*   [`syllable`](https://github.com/words/syllable)
    — Syllable count in an English word

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/words/stemmer/workflows/main/badge.svg

[build]: https://github.com/words/stemmer/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/words/stemmer.svg

[coverage]: https://codecov.io/github/words/stemmer

[downloads-badge]: https://img.shields.io/npm/dm/stemmer.svg

[downloads]: https://www.npmjs.com/package/stemmer

[size-badge]: https://img.shields.io/bundlephobia/minzip/stemmer.svg

[size]: https://bundlephobia.com/result?p=stemmer

[license]: license

[author]: https://wooorm.com

[source]: https://tartarus.org/martin/PorterStemmer

[npm]: https://www.npmjs.com
