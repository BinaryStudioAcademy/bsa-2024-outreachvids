import {
    Badge,
    Box,
    CloseButton,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { IconName, IconSize } from '~/bundles/common/icons/icons.js';
import { Control } from '~/bundles/studio/components/components.js';
import { MenuItems, RowNames } from '~/bundles/studio/enums/enums.js';
import {
    getElementEnd,
    setItemsSpan,
} from '~/bundles/studio/helpers/helpers.js';
import { useTimelineContext } from '~/bundles/studio/hooks/hooks.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

import { Item, Row } from '../components.js';
import styles from './styles.module.css';

const ScenesRow: React.FC = () => {
    const [isResizing, setIsResizing] = useState(false);
    const scenes = useAppSelector(({ studio }) => studio.scenes);
    const scenesWithSpan = useMemo(() => setItemsSpan(scenes), [scenes]);
    const { pixelsToValue } = useTimelineContext();

    const scenesEnd = scenesWithSpan.at(-1)?.span.end ?? 0;
    const buttonWidthInPixels = 60;

    const buttonEnd = getElementEnd(
        scenesEnd,
        pixelsToValue(buttonWidthInPixels),
    );

    const isDeleteAvailable = useMemo(() => scenes.length > 1, [scenes]);

    const dispatch = useAppDispatch();

    const handleAddClick = useCallback(() => {
        dispatch(studioActions.addScene());
        dispatch(studioActions.setMenuActiveItem(MenuItems.AVATARS));
    }, [dispatch]);

    const handleDeleteClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            const id = event.currentTarget.dataset['id'];
            if (id) {
                dispatch(studioActions.deleteScene(id));
            }
        },
        [dispatch],
    );

    const handleItemClick = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            const id = event.currentTarget.dataset['id'];
            if (id) {
                dispatch(
                    studioActions.selectItem({
                        id: id,
                        type: RowNames.SCENE,
                    }),
                );
            }
        },
        [dispatch],
    );

    const handleResizing = useCallback((): void => {
        setIsResizing(true);
    }, []);

    const handleResizingEnd = useCallback((): void => {
        setIsResizing(false);
    }, []);

    return (
        <Row
            id={RowNames.SCENE}
            type={RowNames.SCENE}
            style={{ height: '60px' }}
        >
            {scenesWithSpan.map((item, index) => (
                <Item
                    key={item.id}
                    type={RowNames.SCENE}
                    {...item}
                    onClick={handleItemClick}
                    onResizeEnd={handleResizingEnd}
                    onResizeStart={handleResizing}
                >
                    <Badge
                        className={styles['scene-badge']}
                        variant="solid"
                        borderRadius="5px"
                        px="8px"
                    >
                        {index + 1}
                    </Badge>
                    {(item.background || item.avatar) && (
                        <Box
                            background={`${item.background?.color ?? ''} url(${item.background?.url})`}
                            backgroundSize="contain"
                            height="100%"
                            width="100%"
                        >
                            <Box
                                backgroundImage={item.avatar?.url ?? ''}
                                backgroundSize="contain"
                                height="100%"
                                width="100%"
                            ></Box>
                        </Box>
                    )}
                    {isDeleteAvailable && (
                        <CloseButton
                            onClick={handleDeleteClick}
                            color="gray.300"
                            data-id={item.id}
                            variant="simple"
                            className={styles['scene-delete']}
                        />
                    )}
                </Item>
            ))}

            {!isResizing && (
                <Item
                    type={RowNames.BUTTON}
                    id="Add scene button"
                    span={{ start: scenesEnd, end: buttonEnd }}
                >
                    <Control
                        label="Add a scene"
                        size={IconSize.LARGE}
                        icon={IconName.ADD}
                        variant="light"
                        height="100%"
                        width="100%"
                        isRound={false}
                        onClick={handleAddClick}
                    />
                </Item>
            )}
        </Row>
    );
};

export { ScenesRow };
