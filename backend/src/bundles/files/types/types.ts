type FileType = 'video' | 'photo' | 'audio';

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
type VideoExtension = 'mp4' | 'webm';
type AudioExtension = 'mp3' | 'wav';

export {
    type AudioExtension,
    type FileEntityProperties,
    type FileType,
    type NewFileEntityProperties,
    type PhotoExtension,
    type VideoExtension,
};
