const homeModel = require('../models/homeModel');

module.exports = {
    async index(req, res) {
        const info = await homeModel.getDemoInfo();
        res.render('index', {'messages': info});
    },
    async indexJSON(req, res) {
        const info = await homeModel.getDemoInfo();
        res.json({'title': "Arimdor's Template", 'messages': JSON.stringify(info)});
    }
};