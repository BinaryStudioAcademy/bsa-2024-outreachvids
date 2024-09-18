const VideoValidationMessage = {
    VIDEO_DOESNT_EXIST: 'Video with this id does not exist',
    USER_ID_REQUIRED: 'User id is required',
    UUID_WRONG: 'Invalid UUID',
    NAME_REQUIRED: 'The video name is required',
    NAME_LENGTH: 'The video name should have at least 1 character',
    URL_REQUIRED: 'The video url is required',
    URL_WRONG: 'Invalid url',
    AVATAR_NAME_REQUIRED: 'Avatar name is required',
    AVATAR_STYLE_REQUIRED: 'Avatar style is required',
    VIDEO_NAME_REQUIRED: 'Video name is required',
    SCRIPTS_REQUIRED: 'Scripts are required',
    SCENES_REQUIRED: 'Scenes are required',
    DURATION_REQUIRED: 'Duration is required',
    ID_REQUIRED: 'Id is required',
    AVATAR_ID_REQUIRED: 'Avatar id is required',
    AVATAR_IMG_REQUIRED: 'Avatar img is required',
    TEXT_REQUIRED: 'Text is required',
    VOICE_NAME_REQUIRED: 'Voice name is required',
    VOICE_NAME_INVALID: 'Please enter a valid voice name',
} as const;

export { VideoValidationMessage };
