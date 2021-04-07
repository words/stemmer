/* eslint-env browser */

import {stemmer} from 'stemmer'

const $input = document.querySelector('input')
const $output = document.querySelector('output')

$input.addEventListener('input', oninputchange)

oninputchange()

function oninputchange() {
  $output.textContent = stemmer($input.value)
}
