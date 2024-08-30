type FileType = 'video' | 'photo';

type FileEntityProperties = {
    id: string | null;
    url: string;
    type: FileType;
};

type NewFileEntityProperties = {
    url: string;
    type: FileType;
};

export {
    type FileEntityProperties,
    type FileType,
    type NewFileEntityProperties,
};
