import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { type PlayerRef } from '@remotion/player';
import { secondsToMilliseconds } from 'date-fns';
import {
    type DragEndEvent,
    type DragMoveEvent,
    type Range,
    type ResizeEndEvent,
    type ResizeMoveEvent,
    TimelineContext,
} from 'dnd-timeline';
import { type RefObject } from 'react';

import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';
import {
    DND_ACTIVATION_DISTANCE_PIXELS,
    MIN_SCENE_DURATION,
} from '~/bundles/studio/constants/constants.js';
import { RowNames } from '~/bundles/studio/enums/row-names.enum.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';
import { type RowType } from '~/bundles/studio/types/types.js';

import { TimelineView } from './components.js';

type Properties = {
    playerRef: RefObject<PlayerRef>;
};

const Timeline: React.FC<Properties> = ({ playerRef }) => {
    const dispatch = useAppDispatch();

    const range = useAppSelector(({ studio }) => studio.range);

    const handleResizeEnd = useCallback(
        (event: ResizeEndEvent) => {
            const activeItem = event.active.data.current;
            const activeItemType = activeItem['type'] as RowType;

            const updatedSpan = activeItem.getSpanFromResizeEvent?.(event);

            if (
                !updatedSpan ||
                activeItemType === RowNames.SCRIPT ||
                activeItemType === RowNames.BUTTON
            ) {
                return;
            }

            const activeItemId = event.active.id as string;

            dispatch(
                studioActions.resizeScene({
                    id: activeItemId,
                    span: updatedSpan,
                }),
            );
        },
        [dispatch],
    );

    const handleResizing = useCallback(
        (event: ResizeMoveEvent): void => {
            const activeItem = event.active.data.current;
            const activeItemType = activeItem['type'] as RowType;

            const updatedSpan = activeItem.getSpanFromResizeEvent?.(event);

            if (
                !updatedSpan ||
                activeItemType === RowNames.SCRIPT ||
                activeItemType === RowNames.BUTTON
            ) {
                return;
            }

            if (
                updatedSpan.end - updatedSpan.start <
                secondsToMilliseconds(MIN_SCENE_DURATION)
            ) {
                updatedSpan.end =
                    updatedSpan.start +
                    secondsToMilliseconds(MIN_SCENE_DURATION);

                const activeItemId = event.active.id as string;

                dispatch(
                    studioActions.resizeScene({
                        id: activeItemId,
                        span: updatedSpan,
                    }),
                );
            }
        },
        [dispatch],
    );

    const handleDragMove = useCallback(
        (event: DragMoveEvent) => {
            const activeItem = event.active.data.current;
            const activeItemId = event.active.id as string;
            const activeItemType = activeItem['type'] as RowType;

            if (activeItemType === RowNames.BUTTON) {
                return;
            }

            const activeRowId = event.over?.id as string;
            const updatedSpan = activeItem.getSpanFromDragEvent?.(event);

            if (!updatedSpan || !activeRowId) {
                return;
            }

            dispatch(
                studioActions.setDestinationPointer({
                    id: activeItemId,
                    span: updatedSpan,
                    type: activeItemType,
                }),
            );
        },
        [dispatch],
    );

    const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
            dispatch(studioActions.removeDestinationPointer());

            const activeItem = event.active.data.current;
            const activeItemId = event.active.id as string;
            const activeItemType = activeItem['type'] as RowType;

            const activeRowId = event.over?.id as string;

            const updatedSpan = activeItem.getSpanFromDragEvent?.(event);

            if (
                !updatedSpan ||
                !activeRowId ||
                activeItemType === RowNames.BUTTON
            ) {
                return;
            }

            switch (activeItemType) {
                case RowNames.SCENE: {
                    dispatch(
                        studioActions.reorderScenes({
                            id: activeItemId,
                            span: updatedSpan,
                        }),
                    );
                    break;
                }
                case RowNames.SCRIPT: {
                    dispatch(
                        studioActions.reorderScripts({
                            id: activeItemId,
                            span: updatedSpan,
                        }),
                    );
                    break;
                }
            }
        },
        [dispatch],
    );

    const handleRangeChanged = useCallback(
        (updateFunction: (previous: Range) => Range) => {
            const newRange = updateFunction(range);
            dispatch(studioActions.setRange(newRange));
        },
        [dispatch, range],
    );

    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: DND_ACTIVATION_DISTANCE_PIXELS,
        },
    });

    const sensors = useSensors(pointerSensor);

    return (
        <TimelineContext
            range={range}
            onDragEnd={handleDragEnd}
            onResizeMove={handleResizing}
            onResizeEnd={handleResizeEnd}
            onRangeChanged={handleRangeChanged}
            onDragMove={handleDragMove}
            sensors={sensors}
        >
            <TimelineView playerRef={playerRef} />
        </TimelineContext>
    );
};

export { Timeline };
