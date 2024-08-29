import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class FileModel extends AbstractModel {
    public 'url': string;
    public 'type': 'video' | 'photo';

    public static override get tableName(): string {
        return DatabaseTableName.FILES;
    }
}

export { FileModel };
