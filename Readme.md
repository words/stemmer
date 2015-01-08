# stemmer [![Build Status](https://img.shields.io/travis/wooorm/stemmer.svg?style=flat)](https://travis-ci.org/wooorm/stemmer) [![Coverage Status](https://img.shields.io/coveralls/wooorm/stemmer.svg?style=flat)](https://coveralls.io/r/wooorm/stemmer?branch=master)

A pretty fast version of the [Porter stemming algorithm](http://tartarus.org/martin/PorterStemmer/).

> **Check out [wooorm/stmr.c](https://github.com/wooorm/stmr.c) for an even faster version**

## Installation

npm:
```sh
$ npm install stemmer
```

Component:
```sh
$ component install wooorm/stemmer
```

Bower:
```sh
$ bower install stemmer
```

## Usage

```js
var stemmer = require('stemmer');

stemmer("considerations"); // "consider"
stemmer("detestable"); // "detest"
stemmer("vileness"); // "vile"
```

## Other Porter Stemmer implementations

- [NaturalNode/natural](https://github.com/NaturalNode/natural) — Currently [buggy](https://github.com/NaturalNode/natural/issues/176).
- [jedp/porter-stemmer](https://github.com/jedp/porter-stemmer) — Has a nice memorizing feature, which might be useful!

## Benchmark

On a MacBook Air, it runs about 688,000 op/s.

```
           stemmer — this module
  688 op/s » op/s * 1,000

           porterStemmer
  372 op/s » op/s * 1,000

           natural - fails on 558 out of 23532 unit tests
   63 op/s » op/s * 1,000
```

## License

[MIT](LICENSE) @ Titus Wormer
