import {
    faBackwardStep,
    faCircleUser,
    faCloudArrowDown,
    faFileLines,
    faForwardStep,
    faHouse,
    faPause,
    faPlay,
    faRightFromBracket,
    faScroll,
    faStop,
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
const Stop = iconConverter(faStop);
const scrollIcon = iconConverter(faScroll);

const CloudArrowDownIcon = iconConverter(faCloudArrowDown);
const VolumeHighIcon = iconConverter(faVolumeHigh);
const VolumeOffIcon = iconConverter(faVolumeOff);
const FileLinesIcon = iconConverter(faFileLines);

export {
    backwardStepIcon,
    CircleUserIcon,
    CloudArrowDownIcon,
    FileLinesIcon,
    fileLinesIcon,
    forwardStepIcon,
    HouseIcon,
    pauseIcon,
    playIcon,
    RightFromBracketIcon,
    scrollIcon,
    Stop,
    VolumeHighIcon,
    VolumeOffIcon,
};
