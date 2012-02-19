var test = require('../test.js'),
    console = require('console');

test.frontend = require('../frontends/console.js');
eval(require('fs').readFileSync('./selftest.js', 'UTF-8'));
test(selftest);
