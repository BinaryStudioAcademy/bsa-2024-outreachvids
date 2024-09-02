import { type RelationMappings, Model } from 'objection';

import { DatabaseTableName } from '~/common/database/database.js';

import { AvatarStyleModel } from './avatar-style.model.js';

class GestureModel extends Model {
    public 'id': string;
    public 'gesture': string;

    public static override get tableName(): string {
        return DatabaseTableName.GESTURES;
    }

    public static get relationMappings(): RelationMappings {
        return {
            avatarStyles: {
                relation: Model.ManyToManyRelation,
                modelClass: AvatarStyleModel,
                join: {
                    from: `${DatabaseTableName.GESTURES}.id`,
                    through: {
                        from: `${DatabaseTableName.AVATARS_STYLES_GESTURES}.gestureId`,
                        to: `${DatabaseTableName.AVATARS_STYLES_GESTURES}.avatarStyleId`,
                    },
                    to: `${DatabaseTableName.AVATARS_STYLES}.id`,
                },
            },
        };
    }
}

export { GestureModel };
