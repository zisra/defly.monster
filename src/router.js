import { Router } from 'express';

import articles from './routes/articles.js';
import auth from './routes/auth.js';
import commands from './routes/commands.js';
import eliteChanges from './routes/eliteChanges.js';
import eliteTeams from './routes/eliteTeams.js';
import feedback from './routes/feedback.js';
import logout from './routes/logout.js';
import session from './routes/session.js';
import skin from './routes/skin.js';
import stats from './routes/stats.js';
import upgrades from './routes/upgrades.js';

const api = Router();

// API routes
api.get('/upgrades', upgrades);
api.post('/feedback', feedback);
api.get('/eliteTeams', eliteTeams);
api.get('/commands', commands);
api.get('/skin', skin);
api.get('/articles', articles);
api.get('/stats', stats);
api.get('/eliteChanges', eliteChanges);

// Session routes
api.get('/auth', auth);
api.get('/session', session);
api.get('/logout', logout);

export default api;
