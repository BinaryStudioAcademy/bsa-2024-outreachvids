import { type Entity } from '~/common/types/types.js';

import {
    type FileEntityProperties,
    type FileType,
    type NewFileEntityProperties,
} from './types/types.js';

class FileEntity implements Entity {
    private 'id': string | null;
    private 'url': string;
    private 'type': FileType;

    private constructor({ id, url, type }: FileEntityProperties) {
        this.id = id;
        this.url = url;
        this.type = type;
    }

    public static initialize({
        id,
        url,
        type,
    }: FileEntityProperties): FileEntity {
        return new FileEntity({
            id,
            url,
            type,
        });
    }

    public static initializeNew({
        url,
        type,
    }: NewFileEntityProperties): FileEntity {
        return new FileEntity({
            id: null,
            url,
            type,
        });
    }

    public toObject(): FileEntityProperties {
        return {
            id: this.id as string,
            url: this.url,
            type: this.type,
        };
    }

    public toNewObject(): NewFileEntityProperties {
        return {
            url: this.url,
            type: this.type,
        };
    }
}

export { FileEntity };
