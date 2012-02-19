var test = require('./test.js/test.js'),
    $    = require('../protojazz.js')
    console = require('console');

test.frontend = require('./test.js/frontends/console.js');
eval(require('fs').readFileSync('tests.js', 'UTF-8'));
test(tests);
