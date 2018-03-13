'use strict';
const postcss = require('postcss');
const data = require('./lib/data');

module.exports = postcss.plugin('postcss-autocorrect', opts => {
  opts = opts || {};
  const shouldInitiateDefaults = !(opts.useDefaultList === false);
  const providedList = opts.providedList || [];

  const mistakes = shouldInitiateDefaults ? data.mistakes : [];
  const corrections = shouldInitiateDefaults ? data.corrections : [];

  if (!!providedList && providedList.length > 0) {
    providedList.forEach(obj => {
      const key = Object.keys(obj)[0];

      obj[key].forEach(value => {
        mistakes.push(value);
        corrections.push(key);
      });
    });
  }

  const checkParameters = (property, line) => {
    const isMistake = mistakes.indexOf(property);
    if (isMistake > -1) {
      let fix = corrections[isMistake];
      console.warn(`Error in line ${line}.`);
      console.warn(`Got ${property} instead of ${fix}`);
      return fix;
    }

    return property;
  };

  return css => {
    css.walkDecls(decl => {
      // check properties
      decl.prop = checkParameters(decl.prop, decl.source.start.line);

      // check values
      const values = decl.value.split(' ');
      const line = decl.source.start.line;

      const corrected = values.map(v => checkParameters(v, line));

      decl.value = corrected.join(' ');
    });
  };
});
