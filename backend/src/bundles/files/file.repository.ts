import { FileEntity } from '~/bundles/files/file.entity.js';
import { type FileModel } from '~/bundles/files/file.model.js';
import { type Repository } from '~/common/types/types.js';

class FilesRepository implements Repository {
    private fileModel: typeof FileModel;

    public constructor(fileModel: typeof FileModel) {
        this.fileModel = fileModel;
    }

    public findById(): ReturnType<Repository['findById']> {
        return Promise.resolve(null);
    }

    public findAll(): ReturnType<Repository['findAll']> {
        return Promise.resolve([]);
    }

    public async create(payload: {
        url: string;
        type: 'video' | 'photo';
    }): Promise<FileEntity> {
        const newFile = await this.fileModel
            .query()
            .insert({
                url: payload.url,
                type: payload.type,
            })
            .returning('*');

        return FileEntity.initialize({
            id: newFile.id,
            url: newFile.url,
            type: newFile.type,
        });
    }

    public update(): ReturnType<Repository['update']> {
        return Promise.resolve(null);
    }

    public delete(): ReturnType<Repository['delete']> {
        return Promise.resolve(true);
    }
}

export { FilesRepository };
