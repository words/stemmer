# stemmer [![Build Status](https://img.shields.io/travis/wooorm/stemmer.svg?style=flat)](https://travis-ci.org/wooorm/stemmer) [![Coverage Status](https://img.shields.io/coveralls/wooorm/stemmer.svg?style=flat)](https://coveralls.io/r/wooorm/stemmer?branch=master)

A pretty fast version of the [Porter stemming algorithm](http://tartarus.org/martin/PorterStemmer/).

> **Check out [wooorm/stmr.c](https://github.com/wooorm/stmr.c) for an even faster version**

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
$ npm install stemmer
```

[Component.js](https://github.com/componentjs/component):

```bash
$ component install wooorm/stemmer
```

[Bower](http://bower.io/#install-packages):

```bash
$ bower install stemmer
```

[Duo](http://duojs.org/#getting-started):

```javascript
var stemmer = require('wooorm/stemmer');
```
## Usage

```javascript
var stemmer = require('stemmer');

stemmer("considerations"); // "consider"
stemmer("detestable"); // "detest"
stemmer("vileness"); // "vile"
```

## CLI

Install:

```bash
npm install --global stemmer
```

Use:

```text
Usage: stemmer [options] <words...>

A pretty fast implementation of the Porter Stemmer algorithm

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

## Benchmark

On a MacBook Air, it runs about 688,000 op/s.

```text
           stemmer — this module
  688 op/s » op/s * 1,000

           porterStemmer
  372 op/s » op/s * 1,000

           natural - fails on 558 out of 23532 unit tests
   63 op/s » op/s * 1,000
```

## License

[MIT](LICENSE) @ Titus Wormer
