import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';
import { ImageCard } from '~/bundles/studio/components/video-menu/components/menu-content/components/components.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

type Properties = {
    imageSource: string;
};

const BackgroundImageCard: React.FC<Properties> = ({ imageSource }) => {
    const dispatch = useAppDispatch();

    const handleImageClick = useCallback((): void => {
        void dispatch(
            studioActions.addBackgroundToScene({
                isValueImage: true,
                value: imageSource,
            }),
        );
    }, [dispatch, imageSource]);

    return <ImageCard imageSource={imageSource} onClick={handleImageClick} />;
};

export { BackgroundImageCard };
