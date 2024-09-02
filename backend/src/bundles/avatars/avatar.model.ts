import { type RelationMappings } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { AvatarStyleModel } from './avatar-style.model.js';

class AvatarModel extends AbstractModel {
    public 'name': string;
    public 'voice': string;
    public 'voiceUrl': string;
    public 'styles': AvatarStyleModel[];

    public static override get tableName(): string {
        return DatabaseTableName.AVATARS;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            styles: {
                relation: AbstractModel.HasManyRelation,
                modelClass: AvatarStyleModel,
                join: {
                    from: 'avatars.id',
                    to: 'avatars_styles.avatarId',
                },
            },
        };
    }
}

export { AvatarModel };
