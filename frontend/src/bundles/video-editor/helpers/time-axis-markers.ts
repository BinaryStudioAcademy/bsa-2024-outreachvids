import {
    format,
    hoursToMilliseconds,
    minutesToMilliseconds,
    secondsToMilliseconds,
} from 'date-fns';

import { type MarkerDefinition } from '../components/timeline/subcomponents/timeaxis.js';

const timeAxisMarkers: MarkerDefinition[] = [
    {
        value: hoursToMilliseconds(24),
    },
    {
        value: hoursToMilliseconds(2),
        minRangeSize: hoursToMilliseconds(24),
    },
    {
        value: hoursToMilliseconds(1),
        minRangeSize: hoursToMilliseconds(24),
    },
    {
        value: hoursToMilliseconds(1),
        maxRangeSize: hoursToMilliseconds(24),
        getLabel: (date: Date) => format(date, 'k'),
    },
    {
        value: minutesToMilliseconds(30),
        maxRangeSize: hoursToMilliseconds(24),
        minRangeSize: hoursToMilliseconds(12),
        getLabel: (date: Date) => format(date, 'hh:mm'),
    },
    {
        value: minutesToMilliseconds(15),
        maxRangeSize: hoursToMilliseconds(12),
        getLabel: (date: Date) => format(date, 'hh:mm'),
    },
    {
        value: minutesToMilliseconds(5),
        maxRangeSize: hoursToMilliseconds(6),
        minRangeSize: hoursToMilliseconds(3),
        getLabel: (date: Date) => format(date, 'hh:mm'),
    },
    {
        value: minutesToMilliseconds(5),
        maxRangeSize: hoursToMilliseconds(3),
        minRangeSize: hoursToMilliseconds(1),
        getLabel: (date: Date) => format(date, 'HH:mm'),
    },
    {
        value: secondsToMilliseconds(30),
        maxRangeSize: minutesToMilliseconds(30),
        minRangeSize: minutesToMilliseconds(10),
        getLabel: (date: Date) => format(date, 'mm:ss'),
    },
    {
        value: 1000,
        maxRangeSize: minutesToMilliseconds(10),
        minRangeSize: minutesToMilliseconds(1),
        getLabel: (date: Date) => format(date, 's'),
    },
];

export { timeAxisMarkers };
