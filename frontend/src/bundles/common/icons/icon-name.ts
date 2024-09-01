import { DownloadIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    faCircleUser,
    faCloudArrowDown,
    faCloudArrowUp,
    faEllipsisVertical,
    faFont,
    faPause,
    faPen,
    faPlay,
    faT,
    faTableColumns,
    faVolumeHigh,
    faVolumeOff,
} from '@fortawesome/free-solid-svg-icons';

const IconName = {
    PEN: faPen,
    PLAY: faPlay,
    PAUSE: faPause,
    VOLUME: faVolumeHigh,
    VOLUME_OFF: faVolumeOff,
    CLOUD_ARROW_DOWN: faCloudArrowDown,
    OPTIONS_VERTICAL: faEllipsisVertical,
    DOWNLOAD: DownloadIcon,
    VIEW: ViewIcon,
    VIEW_OFF: ViewOffIcon,
    AVATAR: faCircleUser,
    UPLOAD: faCloudArrowUp,
    TEMPLATE: faTableColumns,
    SCRIPT: faFont,
    TEXT: faT,
} as const;

export { IconName };
