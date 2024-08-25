import { minutesToMilliseconds } from 'date-fns';
import { useTimelineContext } from 'dnd-timeline';
import { useMemo } from 'react';

interface Marker {
    label?: string;
    sideDelta: number;
    heightMultiplier: number;
}

interface MarkerDefinition {
    value: number;
    maxRangeSize?: number;
    minRangeSize?: number;
    getLabel?: (time: Date) => string;
}

interface TimeAxisProperties {
    markers: MarkerDefinition[];
}

const TimeAxis = (properties: TimeAxisProperties): JSX.Element => {
    const { range, direction, sidebarWidth, valueToPixels } = useTimelineContext();
    const side = direction === 'rtl' ? 'right' : 'left';

    const markers = useMemo(() => {
        const sortedMarkers = [...properties.markers];
        sortedMarkers.sort((a, b) => b.value - a.value);
        const delta = sortedMarkers.at(-1)?.value ?? 0;
        const rangeSize = range.end - range.start;
        const startTime = Math.floor(range.start / delta) * delta;
        const endTime = range.end;
        const timezoneOffset = minutesToMilliseconds(new Date().getTimezoneOffset());
        const markerSideDeltas: Marker[] = [];

        for (let time = startTime; time <= endTime; time += delta) {
            const multiplierIndex = sortedMarkers.findIndex(
                (marker) =>
                    (time - timezoneOffset) % marker.value === 0 &&
                    (!marker.maxRangeSize || rangeSize <= marker.maxRangeSize) &&
                    (!marker.minRangeSize || rangeSize >= marker.minRangeSize),
            );

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
    }, [range, valueToPixels, properties.markers]);

    return (
        <div
            style={{
                height: '20px',
                position: 'relative',
                overflow: 'hidden',
                [side === 'right' ? 'marginRight' : 'marginLeft']: `${sidebarWidth}px`,
            }}
        >
            {markers.map((marker, index) => (
                <div
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
                    <div
                        style={{
                            width: '1px',
                            height: `${100 * marker.heightMultiplier}%`,
                        }}
                    />
                    {marker.label ? (
                        <div
                            style={{
                                paddingLeft: '3px',
                                alignSelf: 'flex-start',
                                fontWeight: marker.heightMultiplier * 1000,
                            }}
                        >
                            {marker.label}
                        </div>
                    ) : null}
                </div>
            ))}
        </div>
    );
};

export { type MarkerDefinition };
export { TimeAxis };