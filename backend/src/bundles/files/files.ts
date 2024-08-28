import { logger } from '~/common/logger/logger.js';
import { fileService } from '~/common/services/services.js';

import { FileController } from './file.controller.js';
import { FileModel } from './file.model.js';
import { FilesRepository } from './file.repository.js';
import { FileManagementService } from './file-management.service.js';

const fileRepository = new FilesRepository(FileModel);
const fileManagementService = new FileManagementService(fileService, fileRepository);
const fileController = new FileController(logger, fileManagementService);

export { fileController,fileManagementService };
