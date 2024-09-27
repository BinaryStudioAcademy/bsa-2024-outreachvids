import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';
import { ImageCard } from '~/bundles/studio/components/video-menu/components/menu-content/components/components.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';
import { type Template } from '~/bundles/studio/types/types.js';

type Properties = {
    template: Template;
};

const TemplateCard: React.FC<Properties> = ({ template }) => {
    const dispatch = useAppDispatch();

    const handleClick = useCallback((): void => {
        void dispatch(studioActions.loadTemplate(template));
    }, [dispatch, template]);

    return (
        <ImageCard imageSource={template.previewUrl} onClick={handleClick} />
    );
};

export { TemplateCard };
