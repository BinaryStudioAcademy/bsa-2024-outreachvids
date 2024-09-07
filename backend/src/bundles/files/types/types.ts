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

type PhotoExtension = 'jpg' | 'jpeg' | 'png' | 'gif' | 'bmp';
type VideoExtension = 'mp4';

export {
    type FileEntityProperties,
    type FileType,
    type NewFileEntityProperties,
    type PhotoExtension,
    type VideoExtension,
};
