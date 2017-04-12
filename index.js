var postcss = require('postcss');

module.exports = postcss.plugin('postcss-autocorrect', function (opts) {

    opts = opts || {};

    var mistakes = [];
    var corrections = [];
    let input = opts.providedList || [];

    // If useDefaultList is true or undefined (by default true)
    let shouldInitiateDefaults = !(opts.useDefaultList === false);

    // If allowed to use default variables, initiate some common cases
    if (shouldInitiateDefaults) {
        mistakes = ['hieght', 'heigth', 'widht', 'pading'];
        corrections = ['height', 'height', 'width', 'padding'];
    }

    // if user has provided input,include them
    if (!!input && input.length > 0) {

        input.forEach(function (obj) {

            let key = Object.keys(obj)[0];

            obj[key].forEach(function (value) {
                mistakes.push(value);
                corrections.push(key);

            });
        });
    }

    return function (css) {

        css.walkRules(function (rule) {

            rule.walkDecls(function (decl) {

                let value = decl.prop;

                // if the css property is inside the array with incorrect syntax
                if (mistakes.indexOf(value) !== -1) {

                    // parse and match
                    corrections.forEach((c, i) => {
                        decl.prop = value === mistakes[i] ?
                          corrections[i] : decl.prop;
                    });

                }

            });

        });

    };

});
