// const { [Client] } = require('pg');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'project1',
    password: '',
    port: 5432,
});

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'testdb',
//   password: '1234abcd',
//   port: 5432,
// });

module.exports = pool;