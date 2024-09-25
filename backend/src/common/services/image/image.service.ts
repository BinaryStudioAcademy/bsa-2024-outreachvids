import { type FileService } from '~/common/services/file/file.service.js';

import { type ImageApi } from './image-base.js';
import { type Composition } from './types/types.js';

type Constructor = {
    fileService: FileService;
    imageApi: ImageApi;
};

class ImageService {
    private fileService: FileService;
    private imageApi: ImageApi;

    public constructor({ fileService, imageApi }: Constructor) {
        this.fileService = fileService;
        this.imageApi = imageApi;
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
