import {
    useAppSelector,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks.js';

import { avatarsMapper } from '../helpers/helpers.js';
import { type AvatarMapped } from '../types/types.js';

const useFilterAvatarStyle = (style: string): AvatarMapped[] => {
    const { avatars } = useAppSelector(({ studio }) => studio);
    const [avatarFiltered, setAvatarFiltered] = useState<AvatarMapped[]>([]);

    useEffect(() => {
        const avatarsMapped = avatarsMapper(avatars);

        const filterAvatars = (): AvatarMapped[] =>
            avatarsMapped.filter(
                ({ style: avatarStyle }) => !style || avatarStyle === style,
            );

        const filteredAvatars = filterAvatars();

        setAvatarFiltered(filteredAvatars);
    }, [avatars, style]);

    return avatarFiltered;
};

export { useFilterAvatarStyle };
