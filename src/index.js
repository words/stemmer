'use strict'

/* eslint-env browser */

var stemmer = require('stemmer')

var $input = document.querySelector('input')
var $output = document.querySelector('output')

$input.addEventListener('input', oninputchange)

oninputchange()

function oninputchange() {
  $output.textContent = stemmer($input.value)
}
