import { type Composition } from 'shared';

import { type Entity } from '~/common/types/types.js';

class VideoEntity implements Entity {
    private 'id': string | null;
    private 'userId': string;
    private 'name': string;
    private 'url': string | null;
    public 'previewUrl': string;
    public 'composition': Composition;

    public 'createdAt': string;

    private constructor({
        id,
        userId,
        name,
        previewUrl,
        composition,
        url,
        createdAt,
    }: {
        id: string | null;
        userId: string;
        name: string;
        previewUrl: string;
        composition: Composition;
        url: string | null;
        createdAt: string;
    }) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.previewUrl = previewUrl;
        this.composition = composition;
        this.url = url;
        this.createdAt = createdAt;
    }

    public static initialize({
        id,
        userId,
        name,
        previewUrl,
        composition,
        url,
        createdAt,
    }: {
        id: string | null;
        userId: string;
        name: string;
        previewUrl: string;
        composition: Composition;
        url: string | null;
        createdAt: string;
    }): VideoEntity {
        return new VideoEntity({
            id,
            userId,
            name,
            composition: composition,
            previewUrl,
            url,
            createdAt,
        });
    }

    public static initializeNew({
        userId,
        name,
        previewUrl,
        composition,
        url,
        createdAt = new Date().toISOString(),
    }: {
        userId: string;
        name: string;
        previewUrl: string;
        composition: Composition;
        url?: string;
        createdAt?: string;
    }): VideoEntity {
        return new VideoEntity({
            id: null,
            userId,
            name,
            composition,
            previewUrl,
            url: url ?? null,
            createdAt,
        });
    }

    public toObject(): {
        id: string;
        userId: string;
        name: string;
        url: string | null;
        previewUrl: string;
        composition: Composition;
        createdAt: string;
    } {
        return {
            id: this.id as string,
            userId: this.userId,
            name: this.name,
            url: this.url,
            composition: this.composition,
            previewUrl: this.previewUrl,
            createdAt: this.createdAt,
        };
    }

    public toNewObject(): {
        userId: string;
        name: string;
        previewUrl: string;
        composition: Composition;
        url: string | null;
        createdAt: string;
    } {
        return {
            userId: this.userId,
            name: this.name,
            composition: this.composition,
            previewUrl: this.previewUrl,
            url: this.url ?? null,
            createdAt: this.createdAt,
        };
    }
}

export { VideoEntity };
