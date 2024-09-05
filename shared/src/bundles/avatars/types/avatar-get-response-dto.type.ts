type AvatarGetResponseDto = {
    id: string;
    name: string;
    voice: string;
    voiceUrl: string;
    styles: {
        imgUrl: string;
        style: string;
        gestures: string[];
    }[];
};

export { type AvatarGetResponseDto };
