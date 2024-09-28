import { type VideoRepository } from '~/bundles/videos/video.repository.js';
import { HTTPCode, HttpError } from '~/common/http/http.js';
import { tokenService } from '~/common/services/services.js';

import { VideoValidationMessage } from './enums/enums.js';

class PublicVideoService {
    private videoRepository: VideoRepository;
    public constructor(videoRepository: VideoRepository) {
        this.videoRepository = videoRepository;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async findUrlByToken(token: any): Promise<string> {
        let id;

        // eslint-disable-next-line no-console
        console.log(token, 'find url by token');
        if (token.id) {
            id = token.id;
            // eslint-disable-next-line no-console
            console.log('id from token', id);
        } else {
            id = await tokenService.getIdFromToken(token);
            // eslint-disable-next-line no-console
            console.log('id from else', id);
        }

        if (!id) {
            this.throwVideoNotFoundError();
        }

        const video = await this.videoRepository.findById(id);

        if (!video) {
            this.throwVideoNotFoundError();
        }

        const { url } = video.toObject();
        if (!url) {
            this.throwVideoNotFoundError();
        }
        return url;
    }

    private throwVideoNotFoundError(): never {
        throw new HttpError({
            message: VideoValidationMessage.VIDEO_DOESNT_EXIST,
            status: HTTPCode.NOT_FOUND,
        });
    }
}

export { PublicVideoService };
