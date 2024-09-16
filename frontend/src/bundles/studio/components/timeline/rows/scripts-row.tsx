import {
    CloseButton,
    Flex,
    Text,
} from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useMemo,
} from '~/bundles/common/hooks/hooks.js';
import { IconName, IconSize } from '~/bundles/common/icons/icons.js';
import { Control } from '~/bundles/studio/components/components.js';
import { NEW_SCRIPT_TEXT } from '~/bundles/studio/components/constants/constants.js';
import { MenuItems, RowNames } from '~/bundles/studio/enums/enums.js';
import {
    getElementEnd,
    setItemsSpan,
} from '~/bundles/studio/helpers/helpers.js';
import { useTimelineContext } from '~/bundles/studio/hooks/hooks.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

import { Item, Row } from '../components.js';

const ScriptsRow: React.FC = () => {
    const scripts = useAppSelector(({ studio }) => studio.scripts);
    const scriptsWithSpan = useMemo(() => setItemsSpan(scripts), [scripts]);
    const { pixelsToValue } = useTimelineContext();

    const scriptsEnd = scriptsWithSpan.at(-1)?.span.end ?? 0;
    const buttonWidthInPixels = 100;

    const buttonEnd = getElementEnd(
        scriptsEnd,
        pixelsToValue(buttonWidthInPixels),
    );

    const dispatch = useAppDispatch();

    const handleAddClick = useCallback(() => {
        dispatch(studioActions.addScript(NEW_SCRIPT_TEXT));
        dispatch(studioActions.setMenuActiveItem(MenuItems.SCRIPT));
    }, [dispatch]);

    const handleDeleteClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            const id = event.currentTarget.dataset['id'];
            if (id) {
                dispatch(studioActions.deleteScript(id));
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
                        type: RowNames.SCRIPT,
                    }),
                );
            }
        },
        [dispatch],
    );

    return (
        <Row
            id={RowNames.SCRIPT}
            type={RowNames.SCRIPT}
            style={{ height: '35px' }}
        >
            {scriptsWithSpan.map((item) => (
                <Item
                    key={item.id}
                    type={RowNames.SCRIPT}
                    {...item}
                    onClick={handleItemClick}
                >
                    <Flex
                        width="100%"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Text
                            variant="bodySmall"
                            textOverflow="ellipsis"
                            overflow="hidden"
                            whiteSpace="nowrap"
                            color="typography.900"
                            padding="0 5px"
                        >
                            {item.text}
                        </Text>
                        <CloseButton
                            onClick={handleDeleteClick}
                            color="gray.300"
                            data-id={item.id}
                            variant="simple"
                        />
                    </Flex>
                </Item>
            ))}

            <Item
                type={RowNames.BUTTON}
                id="Add script button"
                span={{ start: scriptsEnd, end: buttonEnd }}
            >
                <Control
                    label="Add script"
                    size={IconSize.MEDIUM}
                    icon={IconName.ADD}
                    variant="light"
                    height="100%"
                    width="100%"
                    isRound={false}
                    onClick={handleAddClick}
                />
            </Item>
        </Row>
    );
};

export { ScriptsRow };
