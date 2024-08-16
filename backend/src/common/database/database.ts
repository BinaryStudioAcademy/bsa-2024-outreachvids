import { config } from '~/common/config/config.js';
import { logger } from '~/common/logger/logger.js';

import { BaseDatabase } from './base-database.package.js';

const database = new BaseDatabase(config, logger);

export { database };
export { Abstract as AbstractModel } from './abstract.model.js';
export { DatabaseTableName } from './enums/enums.js';
export { type Database } from './types/types.js';
