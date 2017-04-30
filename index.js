'use strict';
var postcss = require('postcss');
var data = require('./lib/data');

module.exports = postcss.plugin('postcss-autocorrect', function (opts) {

    opts = opts || {};
    let mistakes = [];
    let corrections = [];

    let providedList = opts.providedList || [];

    // If useDefaultList is true or undefined (by default true)
    let shouldInitiateDefaults = !(opts.useDefaultList === false);

    // Get the default values
    if (shouldInitiateDefaults) {
        mistakes = data.mistakes;
        corrections = data.corrections;
    }

    // if user has provided input,include them
    if (!!providedList && providedList.length > 0) {
        providedList.forEach(function (obj) {

            let key = Object.keys(obj)[0];

            obj[key].forEach(function (value) {
                mistakes.push(value);
                corrections.push(key);

            });
        });
    }

    function checkParameters(check, line) {
        let isMistake = mistakes.indexOf(check);

        if (isMistake !== -1) {
            let fix = corrections[isMistake];
            console.warn('Error in line ' + line + '.');
            console.warn('Got "' + check + '" instead of "' + fix + '".');
            return fix;
        }

        return check;
    }

    return function (css) {

        css.walkDecls(function (decl) {

            // check properties
            decl.prop = checkParameters(decl.prop, decl.source.start.line);

            // check values
            const values = decl.value.split(' ');
            const line = decl.source.start.line;

            const corrected = values.map(v => {
                return checkParameters(v, line);
            });

            decl.value = corrected.join(' ');

        });

    };

});
