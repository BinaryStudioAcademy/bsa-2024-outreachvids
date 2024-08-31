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
    faFont,
    faPen,
    faT,
    faTableColumns,
} from '@fortawesome/free-solid-svg-icons';

const IconName = {
    PEN: faPen,
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
