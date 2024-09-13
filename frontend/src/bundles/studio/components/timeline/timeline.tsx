import { type PlayerRef } from '@remotion/player';
import {
    type DragEndEvent,
    type DragMoveEvent,
    type Range,
    type ResizeEndEvent,
    TimelineContext,
} from 'dnd-timeline';
import { type RefObject } from 'react';

import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';
import { NEW_SCRIPT_TEXT } from '~/bundles/studio/constants/constants.js';
import { MenuItems } from '~/bundles/studio/enums/enums.js';
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

    const handleButtonClick = useCallback(
        (type: RowType) => {
            switch (type) {
                case RowNames.SCENE: {
                    dispatch(studioActions.addScene());
                    dispatch(
                        studioActions.setMenuActiveItem(MenuItems.AVATARS),
                    );
                    break;
                }
                case RowNames.SCRIPT: {
                    dispatch(studioActions.addScript(NEW_SCRIPT_TEXT));
                    dispatch(studioActions.setMenuActiveItem(MenuItems.SCRIPT));
                    break;
                }
            }
        },
        [dispatch],
    );

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

            if (!updatedSpan || !activeRowId) {
                return;
            }

            const {
                span: { start, end },
            } = activeItem;

            if (
                Math.round(updatedSpan.start) === start &&
                Math.round(updatedSpan.end) == end
            ) {
                if (activeItemType === RowNames.BUTTON) {
                    handleButtonClick(activeRowId as RowType);
                } else {
                    dispatch(
                        studioActions.selectItem({
                            id: activeItemId,
                            type: activeItemType,
                        }),
                    );
                }

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
        [dispatch, handleButtonClick],
    );

    const handleRangeChanged = useCallback(
        (updateFunction: (previous: Range) => Range) => {
            const newRange = updateFunction(range);
            dispatch(studioActions.setRange(newRange));
        },
        [dispatch, range],
    );

    return (
        <TimelineContext
            range={range}
            onDragEnd={handleDragEnd}
            onResizeEnd={handleResizeEnd}
            onRangeChanged={handleRangeChanged}
            onDragMove={handleDragMove}
        >
            <TimelineView playerRef={playerRef} />
        </TimelineContext>
    );
};

export { Timeline };
