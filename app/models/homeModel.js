const DB = require('../../config/database');

module.exports =
    {
        async getDemoInfo() {
            const [result] = await DB.execute('select * from test');
            return result;
        }
    };