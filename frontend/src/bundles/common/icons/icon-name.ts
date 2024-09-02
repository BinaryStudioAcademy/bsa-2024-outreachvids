import { DownloadIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    faCircleUser,
    faCloudArrowDown,
    faCloudArrowUp,
    faEllipsisVertical,
    faFileLines,
    faFont,
    faPause,
    faPen,
    faPlay,
    faScroll,
    faT,
    faTableColumns,
    faVolumeHigh,
    faVolumeOff,
} from '@fortawesome/free-solid-svg-icons';

const IconName = {
    PEN: faPen,
    FILE_LINES: faFileLines,
    PLAY: faPlay,
    SCROLL: faScroll,
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
