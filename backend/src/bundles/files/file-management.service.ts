import { type FileEntity } from '~/bundles/files/file.entity.js';
import { type FilesRepository } from '~/bundles/files/file.repository.js';
import { HttpCode, HttpError } from '~/common/http/http.js';

import { FILE_TYPE_MAP } from './constants/constants.js';
import { FileErrorMessage } from './enums/enums.js';
import { type FileType } from './types/types.js';

class FileManagementService {
    private filesRepository: FilesRepository;

    public constructor(filesRepository: FilesRepository) {
        this.filesRepository = filesRepository;
    }

    private determineFileType(fileName: string): FileType {
        const extension = fileName.split('.').pop()?.toLowerCase();
        if (!extension) {
            throw new HttpError({
                message: FileErrorMessage.NO_EXTENSION,
                status: HttpCode.INTERNAL_SERVER_ERROR,
            });
        }

        const fileType = FILE_TYPE_MAP[extension];

        if (!fileType) {
            throw new HttpError({
                message: FileErrorMessage.UNSUPPORTED_FILE,
                status: HttpCode.UNSUPPORTED_MEDIA_TYPE,
            });
        }
        return fileType;
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
