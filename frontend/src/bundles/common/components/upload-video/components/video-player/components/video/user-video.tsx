import { Video } from 'remotion';

type Properties = {
    src: string;
};

const UserVideo = ({ src }: Properties): JSX.Element => {
    return <Video src={src} width="100%" />;
};

export { UserVideo };
