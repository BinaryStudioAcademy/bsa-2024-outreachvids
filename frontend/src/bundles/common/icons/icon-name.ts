import {
    AddIcon,
    CloseIcon,
    DownloadIcon,
    ViewIcon,
    ViewOffIcon,
} from '@chakra-ui/icons';
import {
    faCircleUser,
    faCloudArrowUp,
    faEllipsisVertical,
    faFileLines,
    faFont,
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
    ADD: AddIcon,
    CLOSE: CloseIcon,
} as const;

export { IconName };
