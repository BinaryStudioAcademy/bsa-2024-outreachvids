import {
    AddIcon,
    ArrowBackIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    CloseIcon,
    DeleteIcon,
    DownloadIcon,
    ViewIcon,
    ViewOffIcon,
    WarningIcon,
} from '@chakra-ui/icons';

import { Logo, LogoText, OpenAi, Voice } from './custom-icons/custom-icons.js';
import {
    BackwardStep,
    Circle,
    CircleUser,
    CloudArrowDown,
    CloudArrowUp,
    Copy,
    EllipsisVertical,
    FileLines,
    Font,
    ForwardStep,
    HeartFill,
    HeartOutline,
    House,
    Image,
    Magnifying,
    Pause,
    Pen,
    Play,
    RightFromBracket,
    Scroll,
    Stop,
    T,
    TableColumns,
    VideoCamera,
    VolumeHigh,
    VolumeOff,
} from './helper/icon-conversion.helper.js';

const IconName = {
    CHEVRON_DOWN: ChevronDownIcon,
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
    CHECK_CIRCLE: CheckCircleIcon,
    OPEN_AI: OpenAi,
    LOGO: Logo,
    LOGO_TEXT: LogoText,
    DELETE: DeleteIcon,
    WARNING: WarningIcon,
    VIDEO_CAMERA: VideoCamera,
    IMAGE: Image,
    CIRCLE: Circle,
    ARROW_BACK: ArrowBackIcon,
    COPY: Copy,
    VOICE: Voice,
    HEART_FILL: HeartFill,
    HEART_OUTLINE: HeartOutline,
    MAGNIFYING: Magnifying,
} as const;

export { IconName };
