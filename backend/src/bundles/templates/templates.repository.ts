import { type Repository } from '~/common/types/types.js';

import { TemplateEntity } from './templates.entity.js';
import { type TemplateModel } from './templates.model.js';

class TemplateRepository implements Repository {
    private templateModel: typeof TemplateModel;

    public constructor(templateModel: typeof TemplateModel) {
        this.templateModel = templateModel;
    }

    public async findById(id: string): Promise<TemplateEntity | null> {
        const template = await this.templateModel
            .query()
            .findById(id)
            .execute();

        return template ? TemplateEntity.initialize(template) : null;
    }

    public async findPublicTemplates(): Promise<TemplateEntity[]> {
        const templates = await this.templateModel
            .query()
            .where('userId', null)
            .execute();

        return templates.map((it) => TemplateEntity.initialize(it));
    }

    public async findByUserId(userId: string): Promise<TemplateEntity[]> {
        const videos = await this.templateModel
            .query()
            .where('userId', userId)
            .execute();

        return videos.map((it) => TemplateEntity.initialize(it));
    }

    public async findAll(): Promise<TemplateEntity[]> {
        const templates = await this.templateModel.query().execute();

        return templates.map((it) => TemplateEntity.initialize(it));
    }

    public async create(entity: TemplateEntity): Promise<TemplateEntity> {
        const { composition, name, previewUrl, userId } = entity.toNewObject();

        const item = await this.templateModel
            .query()
            .insert({
                userId,
                composition,
                name,
                previewUrl,
            })
            .returning('*')
            .execute();

        return TemplateEntity.initialize(item);
    }

    public update(): ReturnType<Repository['update']> {
        return Promise.resolve(null);
    }

    public async delete(id: string): ReturnType<Repository['delete']> {
        const numberOfDeletedRows = await this.templateModel
            .query()
            .deleteById(id)
            .execute();

        return Boolean(numberOfDeletedRows);
    }
}

export { TemplateRepository };
