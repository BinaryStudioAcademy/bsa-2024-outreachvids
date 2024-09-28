import { useParams } from 'react-router-dom';

import { Preview } from '~/bundles/preview/pages/preview.js';

const PreviewWrapper: React.FC = () => {
    const { jwt } = useParams<{ jwt: string }>();

    // eslint-disable-next-line no-console
    console.log('JWT in preview wrapper',jwt);
    return <Preview jwt={jwt ?? ''} />;
};

export { PreviewWrapper };
