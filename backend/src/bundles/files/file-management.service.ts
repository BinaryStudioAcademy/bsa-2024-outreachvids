import { type FileEntity } from '~/bundles/files/file.entity.js';
import { type FilesRepository } from '~/bundles/files/file.repository.js';
import { HttpCode, HttpError } from '~/common/http/http.js';

class FileManagementService {
    private filesRepository: FilesRepository;

    public constructor(filesRepository: FilesRepository) {
        this.filesRepository = filesRepository;
    }

    private determineFileType(fileName: string): 'video' | 'photo' {
        const extension = fileName.split('.').pop()?.toLowerCase();

        if (!extension) {
            throw new HttpError({
                message: 'Unable to determine file type: No extension found',
                status: HttpCode.INTERNAL_SERVER_ERROR,
            });
        }

        const photoExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
        const videoExtensions = ['mp4'];

        if (photoExtensions.includes(extension)) {
            return 'photo';
        } else if (videoExtensions.includes(extension)) {
            return 'video';
        } else {
            throw new HttpError({
                message: 'Unsupported file type',
                status: HttpCode.UNSUPPORTED_MEDIA_TYPE,
            });
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
