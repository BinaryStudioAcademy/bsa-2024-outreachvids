import { logger } from '~/common/logger/logger.js';

import { TemplateController } from './templates.controller.js';
import { TemplateModel } from './templates.model.js';
import { TemplateRepository } from './templates.repository.js';
import { TemplateService } from './templates.service.js';

const templateRepository = new TemplateRepository(TemplateModel);
const templateService = new TemplateService(templateRepository);
const templateController = new TemplateController(logger, templateService);

export { templateController };
