import { Model } from 'objection';

import { DatabaseTableName } from '~/common/database/database.js';

class StyleModel extends Model {
    public 'id': string;
    public 'style': string;

    public static override get tableName(): string {
        return DatabaseTableName.STYLES;
    }
}

export { StyleModel };
