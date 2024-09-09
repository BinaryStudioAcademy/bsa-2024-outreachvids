import { Flex, Image } from '~/bundles/common/components/components.js';
import { useAppDispatch, useCallback } from '~/bundles/common/hooks/hooks.js';
import { actions as studioActions } from '~/bundles/studio/store/studio.js';

type Properties = {
    id: string;
    style: string;
    preview: string;
};

const AvatarCard: React.FC<Properties> = ({ id, style, preview }) => {
    const dispatch = useAppDispatch();

    const handleAvatarClick = useCallback(() => {
        dispatch(
            studioActions.addAvatarToScene({
                id,
                style,
                url: preview,
            }),
        );
    }, [dispatch, id, preview, style]);

    return (
        <Flex
            bg="background.700"
            height="162px"
            alignItems="flex-end"
            borderRadius="7px"
            borderWidth="1px"
            borderColor="transparent"
            transition="all 0.3s ease"
            _hover={{
                backgroundColor: 'background.600',
                borderColor: 'brand.secondary.300',
                cursor: 'pointer',
            }}
            onClick={handleAvatarClick}
        >
            <Image
                boxSize="130px"
                objectFit="cover"
                src={preview}
                alt="Avatar preview"
                borderRadius="7px"
            />
        </Flex>
    );
};

export { AvatarCard };
