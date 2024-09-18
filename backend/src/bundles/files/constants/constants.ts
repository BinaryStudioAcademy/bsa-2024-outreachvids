import {
    type AudioExtension,
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
const VIDEO_EXTENSIONS: VideoExtension[] = ['mp4', 'webm'] as const;
const AUDIO_EXTENSIONS: AudioExtension[] = ['mp3', 'wav'] as const;

const FILE_TYPE_MAP: { [key: string]: FileType } = {
    ...Object.fromEntries(
        PHOTO_EXTENSIONS.map((extension) => [extension, 'photo']),
    ),
    ...Object.fromEntries(
        VIDEO_EXTENSIONS.map((extension) => [extension, 'video']),
    ),
    ...Object.fromEntries(
        AUDIO_EXTENSIONS.map((extension) => [extension, 'audio']),
    ),
};

export { FILE_TYPE_MAP, PHOTO_EXTENSIONS, VIDEO_EXTENSIONS };
