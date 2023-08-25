import { Router } from 'express';

import articles from './routes/articles.js';
import auth from './routes/auth.js';
import commands from './routes/commands.js';
import eliteChanges from './routes/eliteChanges.js';
import eliteDefuse from './routes/eliteDefuse.js';
import eliteTeams from './routes/eliteTeams.js';
import feedback from './routes/feedback.js';
import heart from './routes/heart.js';
import logout from './routes/logout.js';
import session from './routes/session.js';
import skin from './routes/skin.js';
import stats from './routes/stats.js';
import upgrades from './routes/upgrades.js';
import leaveGuild from './routes/leaveGuild.js';

const api = Router();

// API routes
api.get('/upgrades', upgrades);
api.post('/feedback', feedback);
api.get('/eliteTeams', eliteTeams);
api.get('/eliteDefuse', eliteDefuse);
api.get('/commands', commands);
api.get('/skin', skin);
api.get('/articles', articles);
api.get('/eliteChanges', eliteChanges);
api.get('/heart', heart);

// Dashboard routes
api.get('/auth', auth);
api.get('/session', session);
api.get('/logout', logout);
api.get('/stats', stats);
api.delete('/guilds/:id', leaveGuild);

export default api;
