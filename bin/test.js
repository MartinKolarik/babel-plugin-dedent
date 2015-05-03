var path = require('path');
var shell = require('shelljs');

shell.config.fatal = true;

console.log('Cleaning...');
shell.rm('-rf', 'node_modules/babel-dedent/');

console.log('\nTransforming to ES5...');
shell.mkdir('-p', 'node_modules/babel-dedent/test');
shell.exec(path.normalize('node_modules/.bin/babel') + ' --out-dir node_modules/babel-dedent src');
shell.exec(path.normalize('node_modules/.bin/babel') + ' --plugins babel-dedent --out-dir node_modules/babel-dedent/test test');

console.log('\nTesting...');
shell.exec(path.normalize('node_modules/.bin/mocha') + ' node_modules/babel-dedent/test');

console.log('\nDone.');
