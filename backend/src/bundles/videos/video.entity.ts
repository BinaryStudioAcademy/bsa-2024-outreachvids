import { type Composition } from 'shared';

import { type Entity } from '~/common/types/types.js';

class VideoEntity implements Entity {
    private 'id': string | null;
    private 'userId': string;
    private 'name': string;
    private 'url': string | null;
    public 'previewUrl': string;
    public 'composition': Composition;

    private constructor({
        id,
        userId,
        name,
        previewUrl,
        composition,
        url,
    }: {
        id: string | null;
        userId: string;
        name: string;
        previewUrl: string;
        composition: Composition;
        url: string | null;
    }) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.previewUrl = previewUrl;
        this.composition = composition;
        this.url = url;
    }

    public static initialize({
        id,
        userId,
        name,
        previewUrl,
        composition,
        url,
    }: {
        id: string | null;
        userId: string;
        name: string;
        previewUrl: string;
        composition: Composition;
        url: string | null;
    }): VideoEntity {
        return new VideoEntity({
            id,
            userId,
            name,
            composition: composition,
            previewUrl,
            url,
        });
    }

    public static initializeNew({
        userId,
        name,
        previewUrl,
        composition,
        url,
    }: {
        userId: string;
        name: string;
        previewUrl: string;
        composition: Composition;
        url?: string;
    }): VideoEntity {
        return new VideoEntity({
            id: null,
            userId,
            name,
            composition,
            previewUrl,
            url: url ?? null,
        });
    }

    public toObject(): {
        id: string;
        userId: string;
        name: string;
        url: string | null;
        previewUrl: string;
        composition: Composition;
    } {
        return {
            id: this.id as string,
            userId: this.userId,
            name: this.name,
            url: this.url,
            composition: this.composition,
            previewUrl: this.previewUrl,
        };
    }

    public toNewObject(): {
        userId: string;
        name: string;
        previewUrl: string;
        composition: Composition;
        url: string | null;
    } {
        return {
            userId: this.userId,
            name: this.name,
            composition: this.composition,
            previewUrl: this.previewUrl,
            url: this.url ?? null,
        };
    }
}

export { VideoEntity };
