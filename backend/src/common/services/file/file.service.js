import { GetObjectCommand, PutObjectCommand, S3Client, } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
class FileService {
    config;
    client;
    bucketName;
    cfDistributionId;
    constructor(config) {
        this.config = config;
        this.client = this.initClient();
        this.bucketName = this.config.ENV.AWS.S3.BUCKET_NAME;
        this.cfDistributionId = this.config.ENV.AWS.CLOUDFRONT.DOMAIN_ID;
    }
    initClient() {
        return new S3Client({
            credentials: {
                accessKeyId: this.config.ENV.AWS.ACCESS_KEY_ID,
                secretAccessKey: this.config.ENV.AWS.SECRET_ACCESS_KEY,
            },
            region: this.config.ENV.AWS.S3.REGION,
        });
    }
    uploadFile = async (buffer, fileName) => {
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: fileName,
            Body: buffer,
        });
        await this.client.send(command);
    };
    getFileUrl = async (fileName) => {
        const getFileObject = new GetObjectCommand({
            Bucket: this.bucketName,
            Key: fileName,
        });
        return await getSignedUrl(this.client, getFileObject, {
            expiresIn: 3600,
        });
    };
    getCloudFrontFileUrl = (fileName) => {
        return `https://${this.cfDistributionId}.cloudfront.net/${fileName}`;
    };
}
export { FileService };
