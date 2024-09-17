import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class VideoModel extends AbstractModel {
    public 'userId': string;

    public 'name': string;

    public 'previewUrl': string;

    public 'composition': string;

    public 'url': string | null;

    public static override get tableName(): string {
        return DatabaseTableName.VIDEOS;
    }
}

export { VideoModel };
