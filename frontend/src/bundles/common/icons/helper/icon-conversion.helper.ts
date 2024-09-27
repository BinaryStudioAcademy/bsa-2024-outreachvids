import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import {
    faBackwardStep,
    faCircle,
    faCircleUser,
    faCloudArrowDown,
    faCloudArrowUp,
    faCopy,
    faEllipsisVertical,
    faFileLines,
    faFont,
    faForwardStep,
    faHeart,
    faHouse,
    faImage,
    faMagnifyingGlass,
    faPause,
    faPen,
    faPlay,
    faRightFromBracket,
    faScroll,
    faStop,
    faT,
    faTableColumns,
    faUserLarge,
    faVideoCamera,
    faVolumeHigh,
    faVolumeOff,
} from '@fortawesome/free-solid-svg-icons';

import { convertIcon } from './convert-icon.helper.js';

const CircleUser = convertIcon(faCircleUser);
const BackwardStep = convertIcon(faBackwardStep);
const FileLines = convertIcon(faFileLines);
const CloudArrowUp = convertIcon(faCloudArrowUp);
const EllipsisVertical = convertIcon(faEllipsisVertical);
const Font = convertIcon(faFont);
const House = convertIcon(faHouse);
const Pen = convertIcon(faPen);
const Play = convertIcon(faPlay);
const RightFromBracket = convertIcon(faRightFromBracket);
const Scroll = convertIcon(faScroll);
const T = convertIcon(faT);
const TableColumns = convertIcon(faTableColumns);
const ForwardStep = convertIcon(faForwardStep);
const Pause = convertIcon(faPause);
const CloudArrowDown = convertIcon(faCloudArrowDown);
const VolumeHigh = convertIcon(faVolumeHigh);
const VolumeOff = convertIcon(faVolumeOff);
const Stop = convertIcon(faStop);
const VideoCamera = convertIcon(faVideoCamera);
const Image = convertIcon(faImage);
const AIAvatars = convertIcon(faUserLarge);
const Heart = convertIcon(faHeart);
const Circle = convertIcon(faCircle);
const Copy = convertIcon(faCopy);
const HeartFill = convertIcon(faHeart);
const HeartOutline = convertIcon(faHeartRegular);
const Magnifying = convertIcon(faMagnifyingGlass);

export {
    AIAvatars,
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
    Heart,
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
};
