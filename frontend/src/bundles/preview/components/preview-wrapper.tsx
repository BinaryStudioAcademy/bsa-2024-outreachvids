import { useParams } from 'react-router-dom';

import { Preview } from '~/bundles/preview/pages/preview.js';

const PreviewWrapper: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    return <Preview id={id ?? ''} />;
};

export { PreviewWrapper };