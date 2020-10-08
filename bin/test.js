var path = require('path');
var shell = require('shelljs');

var es2015 = [
	'@babel/plugin-transform-arrow-functions',
	'@babel/plugin-transform-block-scoped-functions',
	'@babel/plugin-transform-block-scoping',
	'@babel/plugin-transform-classes',
	'@babel/plugin-transform-computed-properties',
	'@babel/plugin-transform-destructuring',
	'@babel/plugin-transform-duplicate-keys',
	'@babel/plugin-transform-for-of',
	'@babel/plugin-transform-function-name',
	'@babel/plugin-transform-instanceof',
	'@babel/plugin-transform-literals',
	'@babel/plugin-transform-new-target',
	'@babel/plugin-transform-object-super',
	'@babel/plugin-transform-parameters',
	'@babel/plugin-transform-shorthand-properties',
	'@babel/plugin-transform-spread',
	'@babel/plugin-transform-sticky-regex',
	'@babel/plugin-transform-template-literals',
	'@babel/plugin-transform-typeof-symbol',
	'@babel/plugin-transform-unicode-escapes',
	'@babel/plugin-transform-unicode-regex',
];

shell.config.fatal = true;

console.log('Cleaning...');
shell.rm('-rf', 'node_modules/babel-plugin-dedent/');

console.log('\nTransforming to ES5...');
shell.mkdir('-p', 'node_modules/babel-plugin-dedent/test');
shell.exec(path.normalize('node_modules/@babel/cli/bin/babel.js') + ' --presets @babel/env --out-dir node_modules/babel-plugin-dedent src');
shell.exec(path.normalize('node_modules/@babel/cli/bin/babel.js') + ' --plugins dedent,' + es2015.join(',') + ' --out-dir node_modules/babel-plugin-dedent/test test');

console.log('\nTesting...');
shell.exec(path.normalize('node_modules/.bin/mocha') + ' node_modules/babel-plugin-dedent/test');

console.log('\nDone.');
