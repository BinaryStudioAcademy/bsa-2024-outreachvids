import {
    type DragEndEvent,
    type DragMoveEvent,
    type Range,
    type ResizeEndEvent,
    TimelineContext,
} from 'dnd-timeline';

import {
    useAppDispatch,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { RowNames } from '~/bundles/studio/enums/row-names.enum.js';
import {
    getDestinationPointerValue,
    getNewItemIndexBySpan,
    reorderItemsByIndexes,
    setItemsSpan,
} from '~/bundles/studio/helpers/helpers.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';
import {
    type RowType,
    type TimelineItem,
} from '~/bundles/studio/types/types.js';

import { TimelineView } from './components.js';

type Properties = {
    initialRange: Range;
    initialScriptItems: Array<TimelineItem>;
};

const Timeline: React.FC<Properties> = ({
    initialRange,
    initialScriptItems,
}) => {
    const dispatch = useAppDispatch();

    const [range, setRange] = useState(initialRange);
    const [scriptItems, setScriptItems] = useState(
        setItemsSpan(initialScriptItems),
    );

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

            if (activeItemType === RowNames.SCENE) {
                dispatch(
                    studioActions.setDestinationPointer({
                        id: activeItemId,
                        span: updatedSpan,
                        type: activeItemType,
                    }),
                );

                return;
            }

            const previousActiveItemIndex = scriptItems.findIndex(
                (item) => item.id === activeItemId,
            );

            const newActiveItemIndex = getNewItemIndexBySpan(
                updatedSpan,
                scriptItems,
            );

            const destinationPointer = {
                type: activeItemType,
                value: getDestinationPointerValue({
                    oldIndex: previousActiveItemIndex,
                    newIndex: newActiveItemIndex,
                    items: scriptItems,
                }),
            };

            dispatch(
                studioActions.updateDestinationPointer(destinationPointer),
            );
        },
        [dispatch, scriptItems],
    );

    const onDragEnd = useCallback(
        (event: DragEndEvent) => {
            dispatch(studioActions.removeDestinationPointer());

            const activeItem = event.active.data.current;

            const activeRowId = event.over?.id as string;
            const updatedSpan = activeItem.getSpanFromDragEvent?.(event);

            if (!updatedSpan || !activeRowId) {
                return;
            }

            const activeItemType = activeItem['type'] as RowType;
            const activeItemId = event.active.id as string;

            if (activeItemType === RowNames.SCENE) {
                dispatch(
                    studioActions.reorderScenes({
                        id: activeItemId,
                        span: updatedSpan,
                    }),
                );

                return;
            }

            setScriptItems((previousItems) => {
                const previousActiveItemIndex = previousItems.findIndex(
                    (item) => item.id === activeItemId,
                );

                const newActiveItemIndex = getNewItemIndexBySpan(
                    updatedSpan,
                    previousItems,
                );

                return setItemsSpan(
                    reorderItemsByIndexes({
                        oldIndex: previousActiveItemIndex,
                        newIndex: newActiveItemIndex,
                        items: previousItems,
                    }),
                );
            });
        },
        [dispatch],
    );

    return (
        <TimelineContext
            range={range}
            onDragEnd={onDragEnd}
            onResizeEnd={onResizeEnd}
            onRangeChanged={setRange}
            onDragMove={onDragMove}
        >
            <TimelineView scriptItems={scriptItems} />
        </TimelineContext>
    );
};

export { Timeline };
