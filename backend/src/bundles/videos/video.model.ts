import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class VideoModel extends AbstractModel {
    public 'userId': string;

    public 'name': string;

    public 'url': string;

    public static override get tableName(): string {
        return DatabaseTableName.VIDEOS;
    }
}

export { VideoModel };
