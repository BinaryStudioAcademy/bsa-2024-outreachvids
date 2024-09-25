import { type FileService } from '~/common/services/file/file.service.js';

import { type Composition } from './types/types.js';

class ImageService {
    private fileService: FileService;

    public constructor(fileService: FileService) {
        this.fileService = fileService;
    }

    public generatePreview(composition: Composition): string {
        const avatarImage = composition.scenes[0]?.avatar?.url ?? '';
        const background = composition.scenes[0]?.background;

        if (background?.url) {
            // TODO: combine avatar and bg
        }

        if (background?.color) {
            // TODO: create empty image with bg color
            // then combine avatar and this new image
        }

        return avatarImage;
    }
}

export { ImageService };
