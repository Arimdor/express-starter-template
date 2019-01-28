const DB = require('../../config/database');

module.exports = {
    async index(req, res) {
        DB.query('select * from test', null, function (result, err) {
            if (err) {
                throw err;
            }
        });
        res.render('index', {'title': "Arimdor's Template"});
    },
    indexJSON(req, res) {
        DB.query('select * from test', null, function (result, err) {
            if (err) {
                throw err;
            }
            res.json({'title': "Arimdor's Template", 'result': JSON.stringify(result)});

        });
    }
};