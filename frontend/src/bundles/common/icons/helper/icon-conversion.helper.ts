import {
    faBackwardStep,
    faCircle,
    faCircleUser,
    faCloudArrowDown,
    faFileLines,
    faForwardStep,
    faHouse,
    faPause,
    faPlay,
    faRightFromBracket,
    faVolumeHigh,
    faVolumeOff,
} from '@fortawesome/free-solid-svg-icons';

import { iconConverter } from './icon-converter.helper.js';

const HouseIcon = iconConverter(faHouse);
const RightFromBracketIcon = iconConverter(faRightFromBracket);
const CircleUserIcon = iconConverter(faCircleUser);
const backwardStepIcon = iconConverter(faBackwardStep);
const forwardStepIcon = iconConverter(faForwardStep);
const pauseIcon = iconConverter(faPause);
const playIcon = iconConverter(faPlay);
const fileLinesIcon = iconConverter(faFileLines);

const CloudArrowDownIcon = iconConverter(faCloudArrowDown);
const VolumeHighIcon = iconConverter(faVolumeHigh);
const VolumeOffIcon = iconConverter(faVolumeOff);
const FileLinesIcon = iconConverter(faFileLines);
const Circle = iconConverter(faCircle);

export {
    backwardStepIcon,
    Circle,
    CircleUserIcon,
    CloudArrowDownIcon,
    FileLinesIcon,
    fileLinesIcon,
    forwardStepIcon,
    HouseIcon,
    pauseIcon,
    playIcon,
    RightFromBracketIcon,
    VolumeHighIcon,
    VolumeOffIcon,
};
