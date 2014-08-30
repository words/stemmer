'use strict';

var step2list, step3list, consonant, vowel, consonantSequence,
    vowelSequence, EXPRESSION_MEASURE_GREATER_THAN_0,
    EXPRESSION_MEASURE_EQUAL_TO_1, EXPRESSION_MEASURE_GREATER_THAN_1,
    EXPRESSION_VOWEL_IN_STEM, EXPRESSION_CONSONANT_LIKE,
    EXPRESSION_SUFFIX_LL, EXPRESSION_SUFFIX_E, EXPRESSION_SUFFIX_Y,
    EXPRESSION_SUFFIX_ION, EXPRESSION_SUFFIX_ED_OR_ING,
    EXPRESSION_SUFFIX_AT_OR_BL_OR_IZ, EXPRESSION_SUFFIX_EED,
    EXPRESSION_SUFFIX_S, EXPRESSION_SUFFIX_SSES_OR_IES,
    EXPRESSION_SUFFIX_MULTI_CONSONANT_LIKE, EXPRESSION_STEP_2,
    EXPRESSION_STEP_3, EXPRESSION_STEP_4;

step2list = {
    'ational' : 'ate',
    'tional' : 'tion',
    'enci' : 'ence',
    'anci' : 'ance',
    'izer' : 'ize',
    'bli' : 'ble',
    'alli' : 'al',
    'entli' : 'ent',
    'eli' : 'e',
    'ousli' : 'ous',
    'ization' : 'ize',
    'ation' : 'ate',
    'ator' : 'ate',
    'alism' : 'al',
    'iveness' : 'ive',
    'fulness' : 'ful',
    'ousness' : 'ous',
    'aliti' : 'al',
    'iviti' : 'ive',
    'biliti' : 'ble',
    'logi' : 'log'
};

step3list = {
    'icate' : 'ic',
    'ative' : '',
    'alize' : 'al',
    'iciti' : 'ic',
    'ical' : 'ic',
    'ful' : '',
    'ness' : ''
};

consonant = '[^aeiou]';
vowel = '[aeiouy]';
consonantSequence = '(' + consonant + '[^aeiouy]*)';
vowelSequence = '(' + vowel + '[aeiou]*)';

EXPRESSION_MEASURE_GREATER_THAN_0 = new RegExp(
    '^' + consonantSequence + '?' + vowelSequence + consonantSequence
);

EXPRESSION_MEASURE_EQUAL_TO_1 = new RegExp(
    '^' + consonantSequence + '?' + vowelSequence + consonantSequence +
    vowelSequence + '?$'
);

EXPRESSION_MEASURE_GREATER_THAN_1 = new RegExp(
    '^' + consonantSequence + '?' + '(' + vowelSequence +
    consonantSequence + '){2,}'
);

EXPRESSION_VOWEL_IN_STEM = new RegExp(
    '^' + consonantSequence + '?' + vowel
);

EXPRESSION_CONSONANT_LIKE = new RegExp(
    '^' + consonantSequence + vowel + '[^aeiouwxy]$'
);

EXPRESSION_SUFFIX_LL = /ll$/;
EXPRESSION_SUFFIX_E = /^(.+?)e$/;
EXPRESSION_SUFFIX_Y = /^(.+?)y$/;
EXPRESSION_SUFFIX_ION = /^(.+?(s|t))(ion)$/;
EXPRESSION_SUFFIX_ED_OR_ING = /^(.+?)(ed|ing)$/;
EXPRESSION_SUFFIX_AT_OR_BL_OR_IZ = /(at|bl|iz)$/;
EXPRESSION_SUFFIX_EED = /^(.+?)eed$/;
EXPRESSION_SUFFIX_S = /^.+?[^s]s$/;
EXPRESSION_SUFFIX_SSES_OR_IES = /^.+?(ss|i)es$/;
EXPRESSION_SUFFIX_MULTI_CONSONANT_LIKE = /([^aeiouylsz])\1$/;
EXPRESSION_STEP_2 = new RegExp(
    '^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|' +
    'ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|' +
    'biliti|logi)$'
);
EXPRESSION_STEP_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
EXPRESSION_STEP_4 = new RegExp(
    '^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|' +
    'iti|ous|ive|ize)$'
);

function stemmer(value) {
    var firstCharacterWasLowerCaseY, match;

    value = value.toString().toLowerCase();

    if (value.length < 3) {
        return value;
    }

    if (value[0] === 'y') {
        firstCharacterWasLowerCaseY = true;
        value = 'Y' + value.substr(1);
    }

    /* Step 1a */
    if (EXPRESSION_SUFFIX_SSES_OR_IES.test(value)) {
        /* Remove last two characters from input. */
        value = value.slice(0, -2);
    } else if (EXPRESSION_SUFFIX_S.test(value)) {
        /* Remove last character from input. */
        value = value.slice(0, -1);
    }

    /* Step 1b */
    if (match = EXPRESSION_SUFFIX_EED.exec(value)) {
        if (EXPRESSION_MEASURE_GREATER_THAN_0.test(match[1])) {
            /* Remove last character from input. */
            value = value.slice(0, -1);
        }
    } else if (
        (match = EXPRESSION_SUFFIX_ED_OR_ING.exec(value)) &&
        EXPRESSION_VOWEL_IN_STEM.test(match[1])
    ) {
        value = match[1];

        if (EXPRESSION_SUFFIX_AT_OR_BL_OR_IZ.test(value)) {
            /* Append `e` to input. */
            value += 'e';
        } else if (
            EXPRESSION_SUFFIX_MULTI_CONSONANT_LIKE.test(value)
        ) {
            /* Remove last character from input. */
            value = value.slice(0, -1);
        } else if (EXPRESSION_CONSONANT_LIKE.test(value)) {
            /* Append `e` to input. */
            value += 'e';
        }
    }

    /* Step 1c */
    if (
        (match = EXPRESSION_SUFFIX_Y.exec(value)) &&
        EXPRESSION_VOWEL_IN_STEM.test(match[1])
    ) {
        /* Remove suffixing `y`, and append `i` to input. */
        value = match[1] + 'i';
    }

    /* Step 2 */
    if (
        (match = EXPRESSION_STEP_2.exec(value)) &&
        EXPRESSION_MEASURE_GREATER_THAN_0.test(match[1])
    ) {
        value = match[1] + step2list[match[2]];
    }

    /* Step 3 */
    if (
        (match = EXPRESSION_STEP_3.exec(value)) &&
        EXPRESSION_MEASURE_GREATER_THAN_0.test(match[1])
    ) {
        value = match[1] + step3list[match[2]];
    }

    /* Step 4 */
    if (match = EXPRESSION_STEP_4.exec(value)) {
        if (EXPRESSION_MEASURE_GREATER_THAN_1.test(match[1])) {
            value = match[1];
        }
    } else if (
        (match = EXPRESSION_SUFFIX_ION.exec(value)) &&
        EXPRESSION_MEASURE_GREATER_THAN_1.test(match[1])
    ) {
        value = match[1];
    }

    /* Step 5 */
    if (
        (match = EXPRESSION_SUFFIX_E.exec(value)) &&
        (
            EXPRESSION_MEASURE_GREATER_THAN_1.test(match[1]) ||
            (
                EXPRESSION_MEASURE_EQUAL_TO_1.test(match[1]) &&
                !EXPRESSION_CONSONANT_LIKE.test(match[1])
            )
        )
    ) {
        value = match[1];
    }

    if (
        EXPRESSION_SUFFIX_LL.test(value) &&
        EXPRESSION_MEASURE_GREATER_THAN_1.test(value)
    ) {
        value = value.slice(0, -1);
    }

    /* and turn initial Y back to y */
    if (firstCharacterWasLowerCaseY) {
        value = 'y' + value.substr(1);
    }

    return value;
}

module.exports = stemmer;
