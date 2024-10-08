import { type FileType } from '~/bundles/files/types/types.js';
import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class FileModel extends AbstractModel {
    public 'url': string;
    public 'type': FileType;

    public static override get tableName(): string {
        return DatabaseTableName.FILES;
    }
}

export { FileModel };
