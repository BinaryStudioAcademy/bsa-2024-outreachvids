import sharp from 'sharp';

import { type FileService } from '~/common/services/file/file.service.js';

import { PREVIEW_HEIGHT, PREVIEW_WIDTH } from './constants/constants.js';
import { type ImageApi } from './image-base.js';
import { type Scene } from './types/types.js';

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

    public async generatePreview(scene: Scene): Promise<string> {
        const avatarImage = scene.avatar?.url ?? '';
        const background = scene.background;

        if (background?.url) {
            const backgroundImageBuffer = await this.imageApi.getImageBuffer(
                background.url,
            );

            return await this.combineAvatarWithBackground(
                avatarImage,
                backgroundImageBuffer,
            );
        }

        if (background?.color) {
            const backgroundColorImageBuffer =
                await this.createImageWithBackgroundColor(background.color);

            return await this.combineAvatarWithBackground(
                avatarImage,
                backgroundColorImageBuffer,
            );
        }

        return avatarImage;
    }

    private async combineAvatarWithBackground(
        avatarImage: string,
        background: Buffer,
    ): Promise<string> {
        const avatarImageBuffer =
            await this.imageApi.getImageBuffer(avatarImage);

        const previewBuffer = await this.composeImages(
            avatarImageBuffer,
            background,
        );

        const fileName = `preview_${Date.now()}.jpg`;

        await this.fileService.uploadFile(previewBuffer, fileName);

        return this.fileService.getCloudFrontFileUrl(fileName);
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

    private async createImageWithBackgroundColor(
        backgroundColor: string,
    ): Promise<Buffer> {
        return await sharp({
            create: {
                width: PREVIEW_WIDTH,
                height: PREVIEW_HEIGHT,
                channels: 3,
                background: backgroundColor,
            },
        })
            .toFormat('png')
            .toBuffer();
    }
}

export { ImageService };
