const Pool = require('pg').Pool;

const pool_dev = new Pool({
    user: "postgres",
    password: "7007",
    host: "localhost",
    port: 5432,
    database: "perntodo"
});


const connectionString = process.env.DATABASE_URL;
const pool_prod = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
      }
});

module.exports = pool_prod
// module.exports = process.env.NODE_ENV === 'production'? pool_prod : pool_dev;
