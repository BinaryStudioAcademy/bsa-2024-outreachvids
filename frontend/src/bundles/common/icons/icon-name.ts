import {
    ArrowLeftIcon,
    ArrowRightIcon,
    DownloadIcon,
    ViewIcon,
    ViewOffIcon,
} from '@chakra-ui/icons';
import {
    faCloudArrowUp,
    faEllipsisVertical,
    faFont,
    faPen,
    faScroll,
    faT,
    faTableColumns,
} from '@fortawesome/free-solid-svg-icons';

import {
    CircleUserIcon,
    CloudArrowDown,
    FileLines,
    HouseIcon,
    Pause,
    Play,
    RightFromBracketIcon,
    VolumeHigh,
    VolumeOff,
} from './helper/icon-conversion.helper.js';

const IconName = {
    PEN: faPen,
    HOME: HouseIcon,
    LOG_OUT: RightFromBracketIcon,
    ARROW_LEFT: ArrowLeftIcon,
    ARROW_RIGHT: ArrowRightIcon,
    FILE_LINES: FileLines,
    PLAY: Play,
    SCROLL: faScroll,
    PAUSE: Pause,
    VOLUME: VolumeHigh,
    VOLUME_OFF: VolumeOff,
    CLOUD_ARROW_DOWN: CloudArrowDown,
    OPTIONS_VERTICAL: faEllipsisVertical,
    DOWNLOAD: DownloadIcon,
    VIEW: ViewIcon,
    VIEW_OFF: ViewOffIcon,
    AVATAR: CircleUserIcon,
    UPLOAD: faCloudArrowUp,
    TEMPLATE: faTableColumns,
    SCRIPT: faFont,
    TEXT: faT,
} as const;

export { IconName };
