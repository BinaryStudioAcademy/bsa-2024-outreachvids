import { FileEntity } from '~/bundles/files/file.entity.js';
import { type FileModel } from '~/bundles/files/file.model.js';
import { type Repository } from '~/common/types/types.js';

class FilesRepository implements Repository<FileEntity> {
    private fileModel: typeof FileModel;

    public constructor(fileModel: typeof FileModel) {
        this.fileModel = fileModel;
    }

    public find(): Promise<FileEntity> {
        throw new Error('Method not implemented');
    }

    public findAll(): Promise<FileEntity[]> {
        throw new Error('Method not implemented');
    }

    public async create(payload: { url: string; type: 'video' | 'photo' }): Promise<FileEntity> {
        const newFile = await this.fileModel
            .query()
            .insert({
                url: payload.url,
                type: payload.type
            })
            .returning('*');

        return FileEntity.initialize({
            id: newFile.id,
            url: newFile.url,
            type: newFile.type,
        });
    }

    public update(): Promise<FileEntity> {
        throw new Error('Method not implemented.');
    }

    public delete(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}

export { FilesRepository };
