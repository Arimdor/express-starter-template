process.setMaxListeners(0);

const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 4,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const DB = (function () {
    function _query(query, params, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                callback(null, err);
                throw err;
            }

            connection.query(query, params, function (err, rows) {
                connection.release();
                if (!err) {
                    callback(rows);
                } else {
                    callback(null, err);
                }

            });

            connection.on('error', function (err) {
                console.log('mysql: ' + err);
                connection.release();
                callback(null, err);
                throw err;
            });
        });
    }

    return {
        query: _query
    };
})();

module.exports = DB;