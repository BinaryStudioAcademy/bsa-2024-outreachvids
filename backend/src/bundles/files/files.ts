import { FileModel } from './file.model.js';
import { FilesRepository } from './file.repository.js';
import { FileManagementService } from './file-management.service.js';

const fileRepository = new FilesRepository(FileModel);
const fileManagementService = new FileManagementService(fileRepository);

export { fileManagementService };
