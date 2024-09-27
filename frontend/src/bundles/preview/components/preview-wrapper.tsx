import { useParams } from 'react-router-dom';

import { Preview } from '~/bundles/preview/pages/preview.js';

const PreviewWrapper: React.FC = () => {
    const { jwt } = useParams<{ jwt: string }>();
    return <Preview jwt={jwt ?? ''} />;
};

export { PreviewWrapper };
