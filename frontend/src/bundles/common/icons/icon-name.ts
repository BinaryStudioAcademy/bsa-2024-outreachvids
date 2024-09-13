import {
    AddIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    CloseIcon,
    DeleteIcon,
    DownloadIcon,
    ViewIcon,
    ViewOffIcon,
} from '@chakra-ui/icons';

import { OpenAi } from './custom-icons/custom-icons.js';
import {
    BackwardStep,
    CircleUser,
    CloudArrowDown,
    CloudArrowUp,
    EllipsisVertical,
    FileLines,
    Font,
    ForwardStep,
    House,
    Pause,
    Pen,
    Play,
    RightFromBracket,
    Scroll,
    Stop,
    T,
    TableColumns,
    VolumeHigh,
    VolumeOff,
} from './helper/icon-conversion.helper.js';

const IconName = {
    PEN: Pen,
    HOME: House,
    LOG_OUT: RightFromBracket,
    ARROW_LEFT: ArrowLeftIcon,
    ARROW_RIGHT: ArrowRightIcon,
    PLAY: Play,
    PLAY_STEP_BACK: BackwardStep,
    PLAY_STEP_NEXT: ForwardStep,
    PAUSE: Pause,
    FILE_LINES: FileLines,
    SCROLL: Scroll,
    OPTIONS_VERTICAL: EllipsisVertical,
    VOLUME: VolumeHigh,
    VOLUME_OFF: VolumeOff,
    CLOUD_ARROW_DOWN: CloudArrowDown,
    STOP: Stop,
    DOWNLOAD: DownloadIcon,
    VIEW: ViewIcon,
    VIEW_OFF: ViewOffIcon,
    AVATAR: CircleUser,
    UPLOAD: CloudArrowUp,
    TEMPLATE: TableColumns,
    SCRIPT: Font,
    TEXT: T,
    ADD: AddIcon,
    CLOSE: CloseIcon,
    OPEN_AI: OpenAi,
    DELETE: DeleteIcon,
} as const;

export { IconName };
