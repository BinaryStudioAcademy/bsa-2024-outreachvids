import {
    type DragEndEvent,
    type DragMoveEvent,
    type Range,
    type ResizeEndEvent,
    TimelineContext,
} from 'dnd-timeline';

import {
    useAppDispatch,
    useAppSelector,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';
import { RowNames } from '~/bundles/studio/enums/row-names.enum.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';
import { type RowType } from '~/bundles/studio/types/types.js';

import { TimelineView } from './components.js';

const Timeline: React.FC = () => {
    const dispatch = useAppDispatch();

    const range = useAppSelector(({ studio }) => studio.range);

    const onResizeEnd = useCallback(
        (event: ResizeEndEvent) => {
            const activeItem = event.active.data.current;
            const activeItemType = activeItem['type'] as RowType;

            const updatedSpan = activeItem.getSpanFromResizeEvent?.(event);

            if (!updatedSpan || activeItemType === RowNames.SCRIPT) {
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

    const onDragMove = useCallback(
        (event: DragMoveEvent) => {
            const activeItem = event.active.data.current;

            const activeRowId = event.over?.id as string;
            const updatedSpan = activeItem.getSpanFromDragEvent?.(event);

            if (!updatedSpan || !activeRowId) {
                return;
            }

            const activeItemId = event.active.id as string;
            const activeItemType = activeItem['type'] as RowType;

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

    const onDragEnd = useCallback(
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
                dispatch(
                    studioActions.selectItem({
                        id: activeItemId,
                        type: activeItemType,
                    }),
                );
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

    const onRangeChanged = useCallback(
        (updateFunction: (previous: Range) => Range) => {
            const newRange = updateFunction(range);
            dispatch(studioActions.setRange(newRange));
        },
        [dispatch, range],
    );

    return (
        <TimelineContext
            range={range}
            onDragEnd={onDragEnd}
            onResizeEnd={onResizeEnd}
            onRangeChanged={onRangeChanged}
            onDragMove={onDragMove}
        >
            <TimelineView />
        </TimelineContext>
    );
};

export { Timeline };
