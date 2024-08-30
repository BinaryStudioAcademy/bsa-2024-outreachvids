import {
    Button,
    Header,
    Icon,
    IconButton,
} from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import { VideoEditor } from '../components/video-editor/video-editor.js';

const Studio: React.FC = () => {
    return (
        <>
            <Header
                center={
                    <Button
                        variant="primaryOutlined"
                        label="Resize"
                        sx={{ width: '135px' }}
                    />
                }
                right={
                    <IconButton
                        variant="primaryOutlined"
                        aria-label="Download"
                        icon={<Icon as={IconName.DOWNLOAD} />}
                    />
                }
            />
            <VideoEditor />
        </>
    );
};

export { Studio };
