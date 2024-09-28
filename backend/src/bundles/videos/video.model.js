import { AbstractModel, DatabaseTableName, } from '~/common/database/database.js';
class VideoModel extends AbstractModel {
    'userId';
    'name';
    'url';
    static get tableName() {
        return DatabaseTableName.VIDEOS;
    }
}
export { VideoModel };
