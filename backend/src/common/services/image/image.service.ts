import sharp from 'sharp';

import { type FileService } from '~/common/services/file/file.service.js';

import { PREVIEW_HEIGHT, PREVIEW_WIDTH } from './constants/constants.js';
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

    public async generatePreview(composition: Composition): Promise<string> {
        const avatarImage = composition.scenes[0]?.avatar?.url ?? '';
        const background = composition.scenes[0]?.background;

        if (background?.url) {
            const avatarImageBuffer =
                await this.imageApi.getImageBuffer(avatarImage);
            const backgroundImageBuffer = await this.imageApi.getImageBuffer(
                background.url,
            );

            const previewBuffer = await this.composeImages(
                avatarImageBuffer,
                backgroundImageBuffer,
            );

            const fileName = `preview_${Date.now()}.jpg`;

            await this.fileService.uploadFile(previewBuffer, fileName);

            return this.fileService.getCloudFrontFileUrl(fileName);
        }

        if (background?.color) {
            // TODO: create empty image with bg color
            // then combine avatar and this new image
        }

        return avatarImage;
    }

    private async composeImages(
        avatar: Buffer,
        background: Buffer,
    ): Promise<Buffer> {
        const resizedBackground = await sharp(background)
            .resize(PREVIEW_WIDTH, PREVIEW_HEIGHT, {
                fit: 'cover',
                position: 'center',
            })
            .toBuffer();

        const resizedAvatar = await sharp(avatar)
            .resize(PREVIEW_WIDTH, PREVIEW_HEIGHT, {
                fit: 'inside',
                position: 'bottom',
            })
            .toBuffer();

        return await sharp(resizedBackground)
            .composite([{ input: resizedAvatar, blend: 'over' }])
            .toBuffer();
    }
}

export { ImageService };
