'use strict';

var postcss = require('postcss');
var plugin = require('./');

function run(input, output, opts) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}


it('default params', () => {
    return run('a{heigth:10px}', 'a{height:10px}', { });
});
