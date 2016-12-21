// This file does not get transpiled. Must use CommonJS and ES5.

// Register Babel to transpile before tests run.
require('babel-register')();

// Disable Webpack features not needed in Mocha
require.extensions['.css'] = function() {};