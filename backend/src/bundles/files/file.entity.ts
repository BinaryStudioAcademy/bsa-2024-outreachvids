import { type Entity } from '~/common/types/types.js';

class FileEntity implements Entity {
    private 'id': string | null;
    private 'url': string;
    private 'type': 'video' | 'photo';

    private constructor({
        id,
        url,
        type,
    }: {
        id: string | null;
        url: string;
        type: 'video' | 'photo';
    }) {
        this.id = id;
        this.url = url;
        this.type = type;
    }

    public static initialize({
        id,
        url,
        type,
    }: {
        id: string;
        url: string;
        type: 'video' | 'photo';
    }): FileEntity {
        return new FileEntity({
            id,
            url,
            type,
        });
    }

    public static initializeNew({
        url,
        type,
    }: {
        url: string;
        type: 'video' | 'photo';
    }): FileEntity {
        return new FileEntity({
            id: null,
            url,
            type,
        });
    }

    public toObject(): {
        id: string;
        url: string;
        type: 'video' | 'photo';
    } {
        return {
            id: this.id as string,
            url: this.url,
            type: this.type,
        };
    }

    public toNewObject(): {
        url: string;
        type: 'video' | 'photo';
    } {
        return {
            url: this.url,
            type: this.type,
        };
    }
}

export { FileEntity };
