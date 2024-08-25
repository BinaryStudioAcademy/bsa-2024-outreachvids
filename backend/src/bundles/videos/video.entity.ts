import { type Entity } from '~/common/types/types.js';

class VideoEntity implements Entity {
    private 'id': string | null;

    private 'userId': string;

    private 'name': string;

    private 'url': string;

    private constructor({
        id,
        userId,
        name,
        url,
    }: {
        id: string | null;
        userId: string;
        name: string;
        url: string;
    }) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.url = url;
    }

    public static initialize({
        id,
        userId,
        name,
        url,
    }: {
        id: string;
        userId: string;
        name: string;
        url: string;
    }): VideoEntity {
        return new VideoEntity({
            id,
            userId,
            name,
            url,
        });
    }

    public static initializeNew({
        userId,
        name,
        url,
    }: {
        userId: string;
        name: string;
        url: string;
    }): VideoEntity {
        return new VideoEntity({
            id: null,
            userId,
            name,
            url,
        });
    }

    public toObject(): {
        id: string;
        userId: string;
        name: string;
        url: string;
    } {
        return {
            id: this.id as string,
            userId: this.userId,
            name: this.name,
            url: this.url,
        };
    }

    public toNewObject(): {
        userId: string;
        name: string;
        url: string;
    } {
        return {
            userId: this.userId,
            name: this.name,
            url: this.url,
        };
    }
}

export { VideoEntity };
