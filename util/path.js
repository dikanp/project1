const path = require('path');

// require.main.filename will fail mocha test
module.exports = path.dirname(require.main.filename);