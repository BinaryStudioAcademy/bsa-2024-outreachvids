import { ImageCard } from '~/bundles/studio/components/video-menu/components/menu-content/components/components.js';

type Properties = {
    imageSource: string;
};

const TemplateCard: React.FC<Properties> = ({ imageSource }) => {
    return <ImageCard imageSource={imageSource} />;
};

export { TemplateCard };
