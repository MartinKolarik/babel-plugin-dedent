var path = require('path');
var shell = require('shelljs');

var es2015 = [
	'transform-es2015-template-literals',
	'transform-es2015-literals',
	'transform-es2015-function-name',
	'transform-es2015-arrow-functions',
	'transform-es2015-block-scoped-functions',
	'transform-es2015-classes',
	'transform-es2015-object-super',
	'transform-es2015-shorthand-properties',
	'transform-es2015-computed-properties',
	'transform-es2015-for-of',
	'transform-es2015-sticky-regex',
	'transform-es2015-unicode-regex',
	'transform-es2015-constants',
	'transform-es2015-spread',
	'transform-es2015-parameters',
	'transform-es2015-destructuring',
	'transform-es2015-block-scoping',
	'transform-es2015-typeof-symbol',
	'transform-es2015-modules-commonjs',
];

shell.config.fatal = true;

console.log('Cleaning...');
shell.rm('-rf', 'node_modules/babel-plugin-dedent/');

console.log('\nTransforming to ES5...');
shell.mkdir('-p', 'node_modules/babel-plugin-dedent/test');
shell.exec(path.normalize('node_modules/.bin/babel') + ' --presets es2015 --out-dir node_modules/babel-plugin-dedent src');
shell.exec(path.normalize('node_modules/.bin/babel') + ' --plugins dedent,' + es2015.join(',') + ' --out-dir node_modules/babel-plugin-dedent/test test');

console.log('\nTesting...');
shell.exec(path.normalize('node_modules/.bin/mocha') + ' node_modules/babel-plugin-dedent/test');

console.log('\nDone.');
