'use strict';

var postcss = require('postcss');
var plugin = require('./');

function run(input, output, opts) {
    return postcss([plugin(opts)]).process(input).then(result => {
        expect(result.css).toEqual(output);
        expect(result.warnings().length).toBe(0);
    });
}

it('prop mistake', () => {
    return run('a{heigth:10px}', 'a{height:10px}', {});
});

it('prop & value mistake', () => {
    return run('a{colour:blakc}', 'a{color:black}', {});
});

it('with import', () => {
    return run('a{dislay:flx;}', 'a{display:flex;}', {
        useDefaultList: true,
        providedList: [
            {
                flex: ['flx']
            }
        ]
    });
});

it('should not correct', () => {
    return run('a{colour:blakc;}', 'a{colour:blakc;}', {
        useDefaultList: false
    });
});

it('many values', () => {
    return run('a{border:10px solid blakc}', 'a{border:10px solid black}', {});
});
