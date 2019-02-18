const mysql = require('mysql2');

let pool;

export function getFirst([result]) {
    if (result.length > 0) {
        return result[0]
    }
    return null;
}

export const DB = (function () {
    if (pool) {
        return pool;
    }
    pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectionLimit: 5,
        queueLimit: 0
    }).promise();
    return pool;
})();