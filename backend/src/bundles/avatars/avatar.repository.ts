import { AvatarEntity } from '~/bundles/avatars/avatar.entity.js';
import { type AvatarModel } from '~/bundles/avatars/avatar.model.js';

class AvatarRepository {
    private avatarModel: typeof AvatarModel;

    public constructor(avatarModel: typeof AvatarModel) {
        this.avatarModel = avatarModel;
    }

    public async find(avatarId: string): Promise<AvatarEntity | null> {
        const avatar = await this.avatarModel
            .query()
            .findById(avatarId)
            .withGraphFetched('styles.[gestures, styles]')
            .modifyGraph('styles', (builder) => {
                void builder.select('img_url');
            })
            .modifyGraph('styles.gestures', (builder) => {
                void builder.select('gesture');
            })
            .modifyGraph('styles.styles', (builder) => {
                void builder.select('style');
            })
            .execute();

        return avatar ? AvatarEntity.initialize(avatar) : null;
    }

    public async findAll(): Promise<AvatarEntity[]> {
        const avatars = await this.avatarModel
            .query()
            .withGraphFetched('styles.[gestures, styles]')
            .modifyGraph('styles', (builder) => {
                void builder.select('img_url');
            })
            .modifyGraph('styles.gestures', (builder) => {
                void builder.select('gesture');
            })
            .modifyGraph('styles.styles', (builder) => {
                void builder.select('style');
            })
            .execute();

        return avatars.map((it) => AvatarEntity.initialize(it));
    }
}

export { AvatarRepository };
