import { useTimelineContext } from 'dnd-timeline';

import { Box } from '~/bundles/common/components/components.js';
import { useMemo } from '~/bundles/common/hooks/hooks.js';

type Marker = {
    label?: string;
    sideDelta: number;
    heightMultiplier: number;
};

type MarkerDefinition = {
    value: number;
    maxRangeSize?: number;
    minRangeSize?: number;
    getLabel?: (time: Date) => string;
};

type Properties = {
    markers: MarkerDefinition[];
};

const TimeAxis: React.FC<Properties> = ({
    markers,
}: Properties): JSX.Element => {
    const { range, direction, sidebarWidth, valueToPixels } =
        useTimelineContext();
    const side = direction === 'rtl' ? 'right' : 'left';

    const computedMarkers = useMemo(() => {
        const sortedMarkers = markers.toSorted((a, b) => b.value - a.value);
        const delta = sortedMarkers.at(-1)?.value ?? 0;
        const rangeSize = range.end - range.start;
        const startTime = Math.floor(range.start / delta) * delta;
        const endTime = range.end;
        const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
        const markerSideDeltas: Marker[] = [];

        for (let time = startTime; time <= endTime; time += delta) {
            const multiplierIndex = sortedMarkers.findIndex((marker) => {
                const timeOffset = (time - timezoneOffset) % marker.value === 0;
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
    }, [range, valueToPixels, markers]);

    return (
        <Box
            style={{
                height: '20px',
                position: 'relative',
                overflow: 'hidden',
                [side === 'right' ? 'marginRight' : 'marginLeft']:
                    `${sidebarWidth}px`,
            }}
        >
            {computedMarkers.map((marker, index) => (
                <Box
                    key={`${marker.sideDelta}-${index}`}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end',
                        height: '100%',
                        [side]: `${marker.sideDelta}px`,
                    }}
                >
                    <Box
                        style={{
                            width: '1px',
                            height: `${100 * marker.heightMultiplier}%`,
                        }}
                    />
                    {marker.label && (
                        <Box
                            style={{
                                paddingLeft: '3px',
                                alignSelf: 'flex-start',
                                fontWeight: marker.heightMultiplier * 1000,
                            }}
                        >
                            {marker.label}
                        </Box>
                    )}
                </Box>
            ))}
        </Box>
    );
};

export { type MarkerDefinition };
export { TimeAxis };
