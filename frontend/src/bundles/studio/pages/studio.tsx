import {
    Button,
    Header,
    Icon,
    IconButton,
} from '~/bundles/common/components/components.js';
import { IconEnum } from '~/bundles/common/icons/icons.js';

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
                        icon={<Icon as={IconEnum.DOWNLOAD} />}
                    />
                }
            />
        </>
    );
};

export { Studio };
