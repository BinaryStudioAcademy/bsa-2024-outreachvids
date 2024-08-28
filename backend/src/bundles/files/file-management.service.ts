import { type FileEntity } from '~/bundles/files/file.entity.js';
import { type FilesRepository } from '~/bundles/files/file.repository.js';
import { type FileService } from '~/common/services/file/file.service.js';

class FileManagementService {
    private fileService: FileService;
    private filesRepository: FilesRepository;

    public constructor(fileService: FileService, filesRepository: FilesRepository) {
        this.fileService = fileService;
        this.filesRepository = filesRepository;
    }

    public async uploadAndStoreFile(fileBuffer: Buffer, fileName: string, fileType: 'video' | 'photo'): Promise<FileEntity> {
        await this.fileService.uploadFile(fileBuffer, fileName);

        const fileUrl = this.fileService.getCloudFrontFileUrl(fileName);

        return this.filesRepository.create({
            url: fileUrl,
            type: fileType,
        });
    }
}

export { FileManagementService };
