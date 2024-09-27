import { type Entity } from '~/common/types/types.js';

import { type Composition } from './types/types.js';

class TemplateEntity implements Entity {
    private 'id': string | null;

    public 'name': string;

    public 'userId': string | null;

    public 'composition': Composition;

    public 'previewUrl': string;

    private constructor({
        id,
        name,
        userId,
        composition,
        previewUrl,
    }: {
        id: string | null;
        name: string;
        userId: string | null;
        composition: Composition;
        previewUrl: string;
    }) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.composition = composition;
        this.previewUrl = previewUrl;
    }

    public static initialize({
        id,
        name,
        userId,
        composition,
        previewUrl,
    }: {
        id: string;
        name: string;
        userId: string | null;
        composition: Composition;
        previewUrl: string;
    }): TemplateEntity {
        return new TemplateEntity({
            id,
            name,
            userId: userId,
            composition,
            previewUrl,
        });
    }

    public static initializeNew({
        name,
        userId,
        composition,
        previewUrl,
    }: {
        name: string;
        userId?: string;
        composition: Composition;
        previewUrl: string;
    }): TemplateEntity {
        return new TemplateEntity({
            id: null,
            name,
            userId: userId ?? null,
            composition,
            previewUrl,
        });
    }

    public toObject(): {
        id: string;
        name: string;
        userId: string | null;
        composition: Composition;
        previewUrl: string;
    } {
        return {
            id: this.id as string,
            name: this.name,
            userId: this.userId,
            composition: this.composition,
            previewUrl: this.previewUrl,
        };
    }

    public toNewObject(): {
        name: string;
        userId: string | null;
        composition: Composition;
        previewUrl: string;
    } {
        return {
            name: this.name,
            userId: this.userId,
            composition: this.composition,
            previewUrl: this.previewUrl,
        };
    }
}

export { TemplateEntity };
