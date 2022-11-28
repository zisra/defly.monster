const { Router } = require('express')

const api = Router();

api.get('/upgrades', require('./routes/upgrades.js'));
api.post('/feedback', require('./routes/feedback.js'));
api.get('/eliteTeams', require('./routes/eliteTeams.js'));
api.get('/commands', require('./routes/commands.js'));
api.get('/skin', require('./routes/skins.js'));
api.get('/articles', require('./routes/articles.js'));

module.exports = api;