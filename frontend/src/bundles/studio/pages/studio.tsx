import {
    Button,
    DownloadIcon,
    Header,
    IconButton,
} from '~/bundles/common/components/components.js';

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
                        icon={<DownloadIcon />}
                    />
                }
            />
        </>
    );
};

export { Studio };
