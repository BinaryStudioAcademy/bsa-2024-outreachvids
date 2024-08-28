
import { type FileManagementService } from '~/bundles/files/file-management.service.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    BaseController,
} from '~/common/controller/controller.js';
// import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

interface UploadFileBody {
    file: {
        data: string;
        filename: string;
    };
    type: 'video' | 'photo';
}

class FileController extends BaseController {
    private fileManagementService: FileManagementService;

    public constructor(logger: Logger, fileManagementService: FileManagementService) {
        super(logger, '/files');

        this.fileManagementService = fileManagementService;

        this.addRoute({
            path: '/',
            method: 'POST',
            handler: (options) => this.uploadFile(options as ApiHandlerOptions<{ body: UploadFileBody }>),
        });
    }

    private async uploadFile({ body }: ApiHandlerOptions<{ body: UploadFileBody }>): Promise<ApiHandlerResponse> {
        const { file, type } = body;

        const fileBuffer = Buffer.from(file.data);
        const fileName = file.filename;

        const fileEntity = await this.fileManagementService.uploadAndStoreFile(fileBuffer, fileName, type);

        return {
            status: HttpCode.OK,
            payload: fileEntity.toObject(),
        };
    }
}

export { FileController };
