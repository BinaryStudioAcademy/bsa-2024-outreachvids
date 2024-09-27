import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { type Composition } from './types/types.js';

class TemplateModel extends AbstractModel {
    public 'name': string;

    public 'userId': string | null;

    public 'composition': Composition;

    public 'previewUrl': string;

    public static override get tableName(): string {
        return DatabaseTableName.TEMPLATES;
    }
}

export { TemplateModel };
