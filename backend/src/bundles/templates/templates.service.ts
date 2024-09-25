import { HTTPCode, HttpError } from '~/common/http/http.js';
import { type Service } from '~/common/types/types.js';

import { type UpdateVideoRequestDto } from '../videos/types/types.js';
import { templateErrorMessage } from './enums/enums.js';
import { TemplateEntity } from './templates.entity.js';
import { type TemplateRepository } from './templates.repository.js';
import {
    type CreateTemplateRequestDto,
    type CreateTemplateResponseDto,
    type GetTemplatesResponseDto,
    type Template,
} from './types/types.js';

class TemplateService implements Service {
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

    public async updateTemplate(
        id: string,
        payload: UpdateVideoRequestDto,
        userId: string,
    ): Promise<Template> {
        const template = await this.findById(id);

        if (template?.userId !== userId) {
            throw new HttpError({
                message: templateErrorMessage.YOU_CAN_NOT_DELETE_THIS_TEMPLATE,
                status: HTTPCode.BAD_REQUEST,
            });
        }

        return await this.update(id, payload);
    }

    public async update(
        id: string,
        payload: UpdateVideoRequestDto,
    ): Promise<Template> {
        const updatedTemplate = await this.templateRepository.update(
            id,
            payload,
        );

        if (!updatedTemplate) {
            throw new HttpError({
                message: templateErrorMessage.TEMPLATE_DOES_NOT_EXIST,
                status: HTTPCode.NOT_FOUND,
            });
        }

        return updatedTemplate.toObject();
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

export { TemplateService };
