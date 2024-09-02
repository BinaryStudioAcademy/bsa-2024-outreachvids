import { type RelationMappings, Model } from 'objection';

import { DatabaseTableName } from '~/common/database/database.js';

import { AvatarModel } from './avatar.model.js';
import { GestureModel } from './gesture.model.js';
import { StyleModel } from './style.model.js';

class AvatarStyleModel extends Model {
    public 'id': string;
    public 'avatarId': string;
    public 'styleId': string;
    public 'imgUrl': string;
    public 'gestures': GestureModel[];
    public 'styles': StyleModel[];

    public static override get tableName(): string {
        return DatabaseTableName.AVATARS_STYLES;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            avatars: {
                relation: Model.BelongsToOneRelation,
                modelClass: AvatarModel,
                join: {
                    from: `${DatabaseTableName.AVATARS_STYLES}.avatarId`,
                    to: `${DatabaseTableName.AVATARS}.id`,
                },
            },
            styles: {
                relation: Model.HasManyRelation,
                modelClass: StyleModel,
                join: {
                    from: `${DatabaseTableName.AVATARS_STYLES}.styleId`,
                    to: `${DatabaseTableName.STYLES}.id`,
                },
            },
            gestures: {
                relation: Model.ManyToManyRelation,
                modelClass: GestureModel,
                join: {
                    from: `${DatabaseTableName.AVATARS_STYLES}.id`,
                    through: {
                        from: `${DatabaseTableName.AVATARS_STYLES_GESTURES}.avatarStyleId`,
                        to: `${DatabaseTableName.AVATARS_STYLES_GESTURES}.gestureId`,
                    },
                    to: `${DatabaseTableName.GESTURES}.id`,
                },
            },
        };
    }
}

export { AvatarStyleModel };
