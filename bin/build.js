var path = require('path');
var shell = require('shelljs');

shell.config.fatal = true;

console.log('\nCleaning...');
shell.rm('-rf', 'lib/');

console.log('\nTransforming to ES5...');
shell.exec(path.normalize('node_modules/.bin/babel') + ' --out-dir lib src');

console.log('\nDone.');
