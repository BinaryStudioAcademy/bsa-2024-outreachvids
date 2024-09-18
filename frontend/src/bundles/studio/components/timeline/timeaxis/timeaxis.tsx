import { Box } from '~/bundles/common/components/components.js';
import { useMemo } from '~/bundles/common/hooks/hooks.js';
import { GROW_COEFFICIENT } from '~/bundles/studio/constants/constants.js';
import {
    type Marker,
    type MarkerDefinition,
} from '~/bundles/studio/helpers/time-axis-markers.js';
import { useTimelineContext } from '~/bundles/studio/hooks/hooks.js';

import styles from './styles.module.css';

type Properties = {
    markers: MarkerDefinition[];
};

const TimeAxis: React.FC<Properties> = ({ markers }) => {
    const { range, direction, sidebarWidth, valueToPixels } =
        useTimelineContext();
    const side = direction === 'rtl' ? 'right' : 'left';

    const timelineWidth = range.end * GROW_COEFFICIENT;

    const computeMarkers = useMemo(() => {
        return getComputedMarkers(markers, range, valueToPixels);
    }, [range, valueToPixels, markers]);

    return (
        <Box
            className={styles['time-axis']}
            style={{
                [side === 'right' ? 'marginRight' : 'marginLeft']:
                    `${sidebarWidth}px`,
                width: timelineWidth,
                minWidth: '100%',
            }}
        >
            {computeMarkers.map((marker, index) => (
                <MarkerBox
                    key={`${marker.sideDelta}-${index}`}
                    marker={marker}
                    side={side}
                />
            ))}
        </Box>
    );
};

const getComputedMarkers = (
    markers: MarkerDefinition[],
    range: { start: number; end: number },
    valueToPixels: (value: number) => number,
): Marker[] => {
    const sortedMarkers = markers.toSorted((a, b) => b.value - a.value);
    const delta = sortedMarkers.at(-1)?.value ?? 0;
    const rangeSize = range.end - range.start;
    const startTime = Math.floor(range.start / delta) * delta;
    const endTime = range.end;
    const markerSideDeltas: Marker[] = [];

    for (let time = startTime; time <= endTime; time += delta) {
        const multiplierIndex = sortedMarkers.findIndex((marker) => {
            const timeOffset = time % marker.value === 0;
            const isWithinMaxRange =
                !marker.maxRangeSize || rangeSize <= marker.maxRangeSize;
            const isWithinMinRange =
                !marker.minRangeSize || rangeSize >= marker.minRangeSize;

            return timeOffset && isWithinMaxRange && isWithinMinRange;
        });

        if (multiplierIndex === -1) {
            continue;
        }

        const multiplier = sortedMarkers[multiplierIndex];
        const label = multiplier?.getLabel?.(new Date(time));

        if (label) {
            markerSideDeltas.push({
                label,
                heightMultiplier: 1 / (multiplierIndex + 1),
                sideDelta: valueToPixels(time - range.start),
            });
        }
    }

    return markerSideDeltas;
};

const MarkerBox: React.FC<{ marker: Marker; side: string }> = ({
    marker,
    side,
}) => (
    <Box
        className={styles['marker-container']}
        style={{
            [side]: `${marker.sideDelta}px`,
        }}
    >
        <Box
            className={styles['marker-line']}
            style={{
                height: `${100 * marker.heightMultiplier}%`,
            }}
        />
        {marker.label && (
            <Box
                className={styles['marker-label']}
                style={{
                    fontWeight: marker.heightMultiplier * 1000,
                }}
            >
                {marker.label}
            </Box>
        )}
    </Box>
);

export { TimeAxis };
