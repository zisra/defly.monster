import keyv from 'keyv';

import config from './config.js';

const db = new keyv(config.SECRETS.DATABASE_URL);

export default db;
