import {
    faCloudArrowDown,
    faEllipsisVertical,
    faPause,
    faPen,
    faPlay,
    faVolumeHigh,
    faVolumeOff,
} from '@fortawesome/free-solid-svg-icons';

const IconName = {
    PLAY: faPlay,
    PAUSE: faPause,
    VOLUME: faVolumeHigh,
    VOLUME_OFF: faVolumeOff,
    CLOUD_ARROW_DOWN: faCloudArrowDown,
    OPTIONS_VERTICAL: faEllipsisVertical,
    PEN: faPen,
} as const;

export { IconName };
