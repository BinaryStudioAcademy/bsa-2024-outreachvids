import {
    faBackwardStep,
    faCircleUser,
    faCloudArrowUp,
    faEllipsisVertical,
    faFileLines,
    faFont,
    faForwardStep,
    faHouse,
    faPause,
    faPen,
    faPlay,
    faRightFromBracket,
    faScroll,
    faT,
    faTableColumns,
} from '@fortawesome/free-solid-svg-icons';

import { iconConverter } from './icon-converter.helper.js';

const CircleUserIcon = iconConverter(faCircleUser);
const BackwardStepIcon = iconConverter(faBackwardStep);
const ForwardStepIcon = iconConverter(faForwardStep);
const PauseIcon = iconConverter(faPause);
const PlayIcon = iconConverter(faPlay);
const fileLinesIcon = iconConverter(faFileLines);
const CloudArrowUpIcon = iconConverter(faCloudArrowUp);
const EllipsisVerticalIcon = iconConverter(faEllipsisVertical);
const FileLinesIcon = iconConverter(faFileLines);
const FontIcon = iconConverter(faFont);
const HouseIcon = iconConverter(faHouse);
const PenIcon = iconConverter(faPen);
const RightFromBracketIcon = iconConverter(faRightFromBracket);
const ScrollIcon = iconConverter(faScroll);
const TIcon = iconConverter(faT);
const TableColumnsIcon = iconConverter(faTableColumns);

export {
    BackwardStepIcon,
    CircleUserIcon,
    CloudArrowUpIcon,
    EllipsisVerticalIcon,
    FileLinesIcon,
    fileLinesIcon,
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
};
