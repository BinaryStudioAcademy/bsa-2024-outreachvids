import { logger } from '~/common/logger/logger.js';

import { BaseConfig } from './base-config.package.js';

const config = new BaseConfig(logger);

export { config };
export { type Config } from './types/types.js';
