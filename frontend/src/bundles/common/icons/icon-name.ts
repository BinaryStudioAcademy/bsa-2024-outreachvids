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
    BackwardStepIcon,
    CircleUserIcon,
    CloudArrowUpIcon,
    EllipsisVerticalIcon,
    FileLinesIcon,
    FontIcon,
    ForwardStepIcon,
    HouseIcon,
    PauseIcon,
    PenIcon,
    PlayIcon,
    RightFromBracketIcon,
    ScrollIcon,
    TableColumnsIcon,
    TIcon,
} from './helper/icon-conversion.helper.js';

const IconName = {
    PEN: PenIcon,
    HOME: HouseIcon,
    LOG_OUT: RightFromBracketIcon,
    ARROW_LEFT: ArrowLeftIcon,
    ARROW_RIGHT: ArrowRightIcon,
    PLAY: PlayIcon,
    PLAY_STEP_BACK: BackwardStepIcon,
    PLAY_STEP_NEXT: ForwardStepIcon,
    PAUSE: PauseIcon,
    FILE_LINES: FileLinesIcon,
    SCROLL: ScrollIcon,
    OPTIONS_VERTICAL: EllipsisVerticalIcon,
    DOWNLOAD: DownloadIcon,
    VIEW: ViewIcon,
    VIEW_OFF: ViewOffIcon,
    AVATAR: CircleUserIcon,
    ADD: AddIcon,
    CLOSE: CloseIcon,
    UPLOAD: CloudArrowUpIcon,
    TEMPLATE: TableColumnsIcon,
    SCRIPT: FontIcon,
    TEXT: TIcon,
} as const;

export { IconName };
