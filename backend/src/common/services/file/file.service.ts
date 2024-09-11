import {
    GetObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { type BaseConfig } from '~/common/config/base-config.package.js';

class FileService {
    private config: BaseConfig;
    private client: S3Client;
    private bucketName: string;
    private cfDistributionId: string;

    public constructor(config: BaseConfig) {
        this.config = config;

        this.client = this.initClient();
        this.bucketName = this.config.ENV.AWS.S3.BUCKET_NAME;
        this.cfDistributionId = this.config.ENV.AWS.CLOUDFRONT.DOMAIN_ID;
    }

    private initClient(): S3Client {
        return new S3Client({
            credentials: {
                accessKeyId: this.config.ENV.AWS.ACCESS_KEY_ID,
                secretAccessKey: this.config.ENV.AWS.SECRET_ACCESS_KEY,
            },
            region: this.config.ENV.AWS.S3.REGION,
        });
    }

    public uploadFile = async (
        buffer: Buffer,
        fileName: string,
    ): Promise<void> => {
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: fileName,
            Body: buffer,
        });

        await this.client.send(command);
    };

    public getFileUrl = async (fileName: string): Promise<string> => {
        const getFileObject = new GetObjectCommand({
            Bucket: this.bucketName,
            Key: fileName,
        });

        return await getSignedUrl(this.client, getFileObject, {
            expiresIn: 3600,
        });
    };

    public getCloudFrontFileUrl = (fileName: string): string => {
        return `https://${this.cfDistributionId}.cloudfront.net/${fileName}`;
    };
}

export { FileService };
