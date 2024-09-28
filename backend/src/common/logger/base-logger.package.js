import { pino } from 'pino';
import pretty from 'pino-pretty';
class BaseLogger {
    logger;
    constructor() {
        this.logger = pino(pretty.default());
        this.logger.info('Logger is created…');
    }
    debug(message, parameters = {}) {
        this.logger.debug(parameters, message);
    }
    error(message, parameters = {}) {
        this.logger.error(parameters, message);
    }
    info(message, parameters = {}) {
        this.logger.info(parameters, message);
    }
    warn(message, parameters = {}) {
        this.logger.warn(parameters, message);
    }
}
export { BaseLogger };
