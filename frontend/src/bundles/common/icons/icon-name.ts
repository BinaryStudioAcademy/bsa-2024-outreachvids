import { DownloadIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    faBackwardStep,
    faCircleUser,
    faCloudArrowUp,
    faEllipsisVertical,
    faFileLines,
    faFont,
    faForwardStep,
    faPause,
    faPen,
    faPlay,
    faScroll,
    faT,
    faTableColumns,
} from '@fortawesome/free-solid-svg-icons';

const IconName = {
    PEN: faPen,
    FILE_LINES: faFileLines,
    PLAY: faPlay,
    PLAY_STEP_BACK: faBackwardStep,
    PLAY_STEP_NEXT: faForwardStep,
    PAUSE: faPause,
    SCROLL: faScroll,
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
