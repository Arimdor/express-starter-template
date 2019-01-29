const mysql = require('mysql2');

let pool;

function getPool() {
    if (pool) {
        return pool;
    }
    pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectionLimit: 10,
        queueLimit: 0
    }).promise();
    return pool;
}

module.exports = getPool();