import { Video } from 'remotion';

type Properties = {
    src: string;
};

const UserVideo: React.FC<Properties> = ({ src }) => {
    return <Video src={src} width="100%" />;
};

export { UserVideo };
