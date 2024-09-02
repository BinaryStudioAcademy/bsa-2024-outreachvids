import { type Entity } from '~/common/types/types.js';

import { type Avatar } from './types/types.js';

class AvatarEntity implements Entity {
    private 'id': string | null;

    private 'name': string;

    private 'voice': string;

    private 'voiceUrl': string;

    private 'styles': {
        'imgUrl': string;
        'styles': {
            'style': string;
        }[];
        'gestures': {
            'gesture': string;
        }[];
    }[];

    private constructor({ id, name, voice, voiceUrl, styles }: Avatar) {
        this.id = id;
        this.name = name;
        this.voice = voice;
        this.voiceUrl = voiceUrl;
        this.styles = styles;
    }

    public static initialize({
        id,
        name,
        voice,
        voiceUrl,
        styles,
    }: Avatar): AvatarEntity {
        return new AvatarEntity({
            id,
            name,
            voice,
            voiceUrl,
            styles,
        });
    }

    public static initializeNew({
        name,
        voice,
        voiceUrl,
        styles,
    }: Avatar): AvatarEntity {
        return new AvatarEntity({
            id: null,
            name,
            voice,
            voiceUrl,
            styles,
        });
    }

    public toObject(): {
        id: string;
        name: string;
        voice: string;
        voiceUrl: string;
        styles: {
            imgUrl: string;
            style: string;
            gestures: string[];
        }[];
    } {
        const styles = this.styles.map((avatarModelStyle) => {
            const { styles, imgUrl } = avatarModelStyle;
            const gestures = avatarModelStyle.gestures.map(
                (item) => item.gesture,
            );
            const style = styles[0] ? styles[0].style : '';

            return { imgUrl, style, gestures };
        });

        return {
            id: this.id as string,
            name: this.name,
            voice: this.voice,
            voiceUrl: this.voiceUrl,
            styles,
        };
    }

    public toNewObject(): {
        name: string;
        voice: string;
        voiceUrl: string;
        styles: {
            imgUrl: string;
            style: string;
            gestures: string[];
        }[];
    } {
        const styles = this.styles.map((avatarModelStyle) => {
            const { styles, imgUrl } = avatarModelStyle;
            const gestures = avatarModelStyle.gestures.map(
                (item) => item.gesture,
            );
            const style = styles[0] ? styles[0].style : '';

            return { imgUrl, style, gestures };
        });

        return {
            name: this.name,
            voice: this.voice,
            voiceUrl: this.voiceUrl,
            styles,
        };
    }
}

export { AvatarEntity };
