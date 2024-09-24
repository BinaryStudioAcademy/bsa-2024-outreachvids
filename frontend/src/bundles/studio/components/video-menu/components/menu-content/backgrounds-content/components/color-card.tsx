import { Box } from '~/bundles/common/components/components.js';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

type Properties = {
    color: string;
};

const ColorCard: React.FC<Properties> = ({ color }) => {
    const dispatch = useAppDispatch();

    const handleColorClick = useCallback((): void => {
        void dispatch(
            studioActions.addBackgroundToScene({
                isValueImage: false,
                value: color,
            }),
        );
    }, [dispatch, color]);

    return (
        <Box
            backgroundColor={color}
            height="80px"
            onClick={handleColorClick}
        ></Box>
    );
};

export { ColorCard };
