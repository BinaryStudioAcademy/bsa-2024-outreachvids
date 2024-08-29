import { type FileEntity } from '~/bundles/files/file.entity.js';
import { type FilesRepository } from '~/bundles/files/file.repository.js';

class FileManagementService {
    private filesRepository: FilesRepository;

    public constructor(filesRepository: FilesRepository) {
        this.filesRepository = filesRepository;
    }

    private determineFileType(fileName: string): 'video' | 'photo' {
        const extension = fileName.split('.').pop()?.toLowerCase();

        if (!extension) {
            throw new Error(
                'Unable to determine file type: No extension found',
            );
        }

        const photoExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
        const videoExtensions = ['mp4', 'mov', 'avi', 'mkv'];

        if (photoExtensions.includes(extension)) {
            return 'photo';
        } else if (videoExtensions.includes(extension)) {
            return 'video';
        } else {
            throw new Error('Unsupported file type');
        }
    }

    public async storeFileInfo(
        fileUrl: string,
        fileName: string,
    ): Promise<FileEntity> {
        const fileType = this.determineFileType(fileName);
        return await this.filesRepository.create({
            url: fileUrl,
            type: fileType,
        });
    }
}

export { FileManagementService };
