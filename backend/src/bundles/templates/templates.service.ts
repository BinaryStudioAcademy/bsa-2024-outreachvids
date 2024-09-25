import { HTTPCode, HttpError } from '~/common/http/http.js';
import { type Service } from '~/common/types/types.js';

import { templateErrorMessage } from './enums/enums.js';
import { TemplateEntity } from './templates.entity.js';
import { type TemplateRepository } from './templates.repository.js';
import {
    type CreateTemplateRequestDto,
    type CreateTemplateResponseDto,
    type GetTemplatesResponseDto,
} from './types/types.js';

class TemplatesService implements Service {
    private templateRepository: TemplateRepository;

    public constructor(templateRepository: TemplateRepository) {
        this.templateRepository = templateRepository;
    }

    public async findById(id: string): Promise<TemplateEntity | null> {
        return await this.templateRepository.findById(id);
    }

    public async findPublicTemplates(): Promise<GetTemplatesResponseDto> {
        const items = await this.templateRepository.findPublicTemplates();
        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async findByUserId(
        userId: string,
    ): Promise<GetTemplatesResponseDto> {
        const items = await this.templateRepository.findByUserId(userId);

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async findAll(): Promise<GetTemplatesResponseDto> {
        const items = await this.templateRepository.findAll();

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create(
        payload: CreateTemplateRequestDto & { userId: string },
    ): Promise<CreateTemplateResponseDto> {
        const { composition, name, userId } = payload;

        // TODO: CREATE PREVIEW
        const compositionPreviewUrl = composition.scenes[0]?.avatar?.url ?? '';

        const user = await this.templateRepository.create(
            TemplateEntity.initializeNew({
                composition,
                name,
                userId,
                previewUrl: compositionPreviewUrl,
            }),
        );

        return user.toObject();
    }

    public update(): ReturnType<Service['update']> {
        return Promise.resolve(null);
    }

    public async deleteTemplate(
        templateId: string,
        userId: string,
    ): Promise<boolean> {
        const template = await this.findById(templateId);

        if (template?.userId !== userId) {
            throw new HttpError({
                message: templateErrorMessage.YOU_CAN_NOT_DELETE_THIS_TEMPLATE,
                status: HTTPCode.BAD_REQUEST,
            });
        }

        return await this.delete(templateId);
    }

    public async delete(templateId: string): Promise<boolean> {
        const isTemplateDeleted =
            await this.templateRepository.delete(templateId);

        if (!isTemplateDeleted) {
            throw new HttpError({
                message: templateErrorMessage.TEMPLATE_DOES_NOT_EXIST,
                status: HTTPCode.NOT_FOUND,
            });
        }

        return isTemplateDeleted;
    }
}

export { TemplatesService };
