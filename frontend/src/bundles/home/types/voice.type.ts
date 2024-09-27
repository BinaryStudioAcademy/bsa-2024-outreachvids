import { type Voice as SharedVoice } from 'shared';

type Voice = SharedVoice & {
    isLiked: boolean;
};

export { type Voice };
