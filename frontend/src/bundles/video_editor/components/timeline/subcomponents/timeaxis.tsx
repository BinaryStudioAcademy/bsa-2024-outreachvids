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
    // Destructure necessary properties from the timeline context
    const { range, direction, sidebarWidth, valueToPixels } = useTimelineContext();

    // Determine the side based on the direction
    const side = direction === 'rtl' ? 'right' : 'left';

    // Memoize the markers to avoid unnecessary recalculations
    const markers = useMemo(() => {
        // Create a sorted copy of the markers array
        const sortedMarkers = [...properties.markers];
        sortedMarkers.sort((a, b) => b.value - a.value);

        // Determine the delta value from the last marker
        const delta = sortedMarkers.at(-1)?.value ?? 0;

        // Calculate the range size
        const rangeSize = range.end - range.start;

        // Calculate the start time aligned to the delta
        const startTime = Math.floor(range.start / delta) * delta;

        // Define the end time
        const endTime = range.end;

        // Get the timezone offset in milliseconds
        const timezoneOffset = minutesToMilliseconds(new Date().getTimezoneOffset());

        // Initialize an array to store the marker side deltas
        const markerSideDeltas: Marker[] = [];

        // Loop through the time range in increments of delta
        for (let time = startTime; time <= endTime; time += delta) {
            // Find the appropriate marker based on the current time and range size
            const multiplierIndex = sortedMarkers.findIndex(
                (marker) =>
                    (time - timezoneOffset) % marker.value === 0 &&
                    (!marker.maxRangeSize || rangeSize <= marker.maxRangeSize) &&
                    (!marker.minRangeSize || rangeSize >= marker.minRangeSize),
            );

            // If no suitable marker is found, continue to the next iteration
            if (multiplierIndex === -1) {
                continue;
            }

            // Get the multiplier marker
            const multiplier = sortedMarkers[multiplierIndex];

            // Get the label for the current time
            const label = multiplier?.getLabel?.(new Date(time));

            // If a label is found, add the marker to the array
            if (label) {
                markerSideDeltas.push({
                    label,
                    heightMultiplier: 1 / (multiplierIndex + 1),
                    sideDelta: valueToPixels(time - range.start),
                });
            }
        }

        // Return the calculated marker side deltas
        return markerSideDeltas;
    }, [range, valueToPixels, properties.markers]);

    // Render the time axis with markers
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

export  { type MarkerDefinition };
export { TimeAxis };