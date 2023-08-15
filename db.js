const Pool = require('pg').Pool;

const pool_dev = new Pool({
    user: "postgres",
    password: "7007",
    host: "localhost",
    port: 5432,
    database: "perntodo"
});

const pool_prod = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE_NAME
});

module.exports = process.env.NODE_ENV === 'production'? pool_prod : pool_dev;