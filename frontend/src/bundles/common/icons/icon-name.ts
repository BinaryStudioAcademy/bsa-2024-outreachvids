import {
    AddIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    CloseIcon,
    DownloadIcon,
    ViewIcon,
    ViewOffIcon,
} from '@chakra-ui/icons';
import {
    faCloudArrowUp,
    faEllipsisVertical,
    faFont,
    faPen,
    faT,
    faTableColumns,
} from '@fortawesome/free-solid-svg-icons';

import {
    backwardStepIcon,
    CircleUserIcon,
    CloudArrowDownIcon,
    fileLinesIcon,
    forwardStepIcon,
    HouseIcon,
    pauseIcon,
    playIcon,
    RightFromBracketIcon,
    scrollIcon,
    VolumeHighIcon,
    VolumeOffIcon,
} from './helper/icon-conversion.helper.js';

const IconName = {
    PEN: faPen,
    HOME: HouseIcon,
    LOG_OUT: RightFromBracketIcon,
    ARROW_LEFT: ArrowLeftIcon,
    ARROW_RIGHT: ArrowRightIcon,
    FILE_LINES: fileLinesIcon,
    PLAY: playIcon,
    PLAY_STEP_BACK: backwardStepIcon,
    PLAY_STEP_NEXT: forwardStepIcon,
    PAUSE: pauseIcon,
    SCROLL: scrollIcon,
    VOLUME: VolumeHighIcon,
    VOLUME_OFF: VolumeOffIcon,
    CLOUD_ARROW_DOWN: CloudArrowDownIcon,
    OPTIONS_VERTICAL: faEllipsisVertical,
    DOWNLOAD: DownloadIcon,
    VIEW: ViewIcon,
    VIEW_OFF: ViewOffIcon,
    AVATAR: CircleUserIcon,
    UPLOAD: faCloudArrowUp,
    TEMPLATE: faTableColumns,
    SCRIPT: faFont,
    TEXT: faT,
    ADD: AddIcon,
    CLOSE: CloseIcon,
} as const;

export { IconName };
