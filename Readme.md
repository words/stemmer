# stemmer [![Build Status](https://travis-ci.org/wooorm/stemmer.svg?branch=master)](https://travis-ci.org/wooorm/stemmer) [![Coverage Status](https://img.shields.io/coveralls/wooorm/stemmer.svg)](https://coveralls.io/r/wooorm/stemmer?branch=master)

---

A pretty fast version of the [Porter stemming algorithm](http://tartarus.org/martin/PorterStemmer/).

## Installation

NPM:
```sh
$ npm install stemmer
```

Component.js:
```sh
$ component install wooorm/stemmer
```

## Usage

```js
var stemmer = require('stemmer');

stemmer("considerations"); // "consider"
stemmer("detestable"); // "detest"
stemmer("vileness"); // "vile"
```

## License

  MIT
