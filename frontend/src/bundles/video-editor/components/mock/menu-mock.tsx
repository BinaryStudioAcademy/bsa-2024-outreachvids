import {
    Flex,
    FontAwesomeIcon,
    Icon,
} from '~/bundles/common/components/components.js';
import { IconMap } from '~/bundles/common/icons/icons.js';

const TemplatesContent: React.FC = () => (
    <div>This is the Templates content.</div>
);
const AvatarsContent: React.FC = () => <div>This is the Avatars content.</div>;
const ScriptHeader: React.FC = () => (
    <Flex justifyContent={'space-between'} w={'280px'}>
        <div>Script</div>
        <div>
            <Icon as={FontAwesomeIcon} icon={IconMap.UPLOAD} />
        </div>
    </Flex>
);
const ScriptContent: React.FC = () => <div>This is the Script content.</div>;
const TextContent: React.FC = () => <div>This is the Text content.</div>;
const AssetsContent: React.FC = () => <div>This is the Assets content.</div>;

export {
    AssetsContent,
    AvatarsContent,
    ScriptContent,
    ScriptHeader,
    TemplatesContent,
    TextContent,
};
