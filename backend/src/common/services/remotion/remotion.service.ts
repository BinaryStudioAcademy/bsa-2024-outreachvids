import {
    type AwsRegion,
    deleteRender,
    getRenderProgress,
    renderMediaOnLambda,
} from '@remotion/lambda/client';
import { HTTPCode, HttpError } from 'shared';

import { RenderVideoErrorMessage } from '~/bundles/avatar-videos/enums/enums.js';
import { type BaseConfig } from '~/common/config/base-config.package.js';

import {
    CODEC,
    COMPOSITION_ID,
    DOWNLOAD_BEHAVIOR,
    DOWNLOADED_FILE_NAME,
    REQUEST_DELAY,
} from './constants/constants.js';
import { type InputProps as InputProperties } from './type/types.js';

class RemotionService {
    private config: BaseConfig;
    private cfDistributionId: string;

    public constructor(config: BaseConfig) {
        this.config = config;
        this.cfDistributionId =
            this.config.ENV.AWS.CLOUDFRONT.DOMAIN_ID_FOR_RENDERED_VIDEO;
    }

    public async deleteRenderedVideo(renderId: string): Promise<void> {
        await deleteRender({
            bucketName: this.config.ENV.REMOTION.BUCKET_NAME,
            region: this.config.ENV.AWS.S3.REGION as AwsRegion,
            renderId,
        });
    }

    public async renderVideo(
        inputProperties: InputProperties,
    ): Promise<string> {
        const { renderId } = await renderMediaOnLambda({
            downloadBehavior: {
                type: DOWNLOAD_BEHAVIOR,
                fileName: DOWNLOADED_FILE_NAME,
            },
            region: this.config.ENV.AWS.S3.REGION as AwsRegion,
            functionName: this.config.ENV.REMOTION.LAMBDA_FUNCTION_NAME,
            composition: COMPOSITION_ID,
            serveUrl: this.config.ENV.REMOTION.SERVE_URL,
            inputProps: inputProperties,
            codec: CODEC,
        });

        return renderId;
    }

    public async getRemotionRenderProgress(renderId: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                getRenderProgress({
                    renderId,
                    bucketName: this.config.ENV.REMOTION.BUCKET_NAME,
                    functionName: this.config.ENV.REMOTION.LAMBDA_FUNCTION_NAME,
                    region: this.config.ENV.AWS.S3.REGION as AwsRegion,
                })
                    .then((response) => {
                        if (response.done) {
                            resolve(
                                this.getCloudFrontVideoUrl(response.renderId),
                            );
                            clearInterval(interval);
                        }
                    })
                    .catch(() => {
                        reject(
                            new HttpError({
                                message: RenderVideoErrorMessage.RENDER_ERROR,
                                status: HTTPCode.BAD_REQUEST,
                            }),
                        );
                        clearInterval(interval);
                    });
            }, REQUEST_DELAY);
        });
    }

    private getCloudFrontVideoUrl = (renderId: string): string => {
        return `https://${this.cfDistributionId}.cloudfront.net/renders/${renderId}/out.mp4`;
    };
}

export { RemotionService };
