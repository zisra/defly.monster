const { Router } = require('express');

const api = Router();

// API routes
api.get('/upgrades', require('./routes/upgrades.js'));
api.post('/feedback', require('./routes/feedback.js'));
api.get('/eliteTeams', require('./routes/eliteTeams.js'));
api.get('/commands', require('./routes/commands.js'));
api.get('/skin', require('./routes/skin.js'));
api.get('/articles', require('./routes/articles.js'));
api.get('/stats', require('./routes/stats.js'));
api.get('/server', require('./routes/server.js'));
api.get('/eliteChanges', require('./routes/eliteChanges.js'));

// Session routes
api.get('/auth', require('./routes/auth.js'));
api.get('/session', require('./routes/session.js'));
api.get('/logout', require('./routes/logout.js'));

module.exports = api;
