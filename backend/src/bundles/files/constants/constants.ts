import {
    type FileType,
    type PhotoExtension,
    type VideoExtension,
} from '../types/types.js';

const PHOTO_EXTENSIONS: PhotoExtension[] = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
] as const;
const VIDEO_EXTENSIONS: VideoExtension[] = ['mp4'] as const;

const FILE_TYPE_MAP: { [key: string]: FileType } = {
    ...Object.fromEntries(
        PHOTO_EXTENSIONS.map((extension) => [extension, 'photo']),
    ),
    ...Object.fromEntries(
        VIDEO_EXTENSIONS.map((extension) => [extension, 'video']),
    ),
};

export { FILE_TYPE_MAP, PHOTO_EXTENSIONS, VIDEO_EXTENSIONS };
