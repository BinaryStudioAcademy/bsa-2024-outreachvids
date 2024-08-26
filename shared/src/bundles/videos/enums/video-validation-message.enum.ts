const VideoValidationMessage = {
    VIDEO_DOESNT_EXIST: 'Video with this id does not exist',
    USER_ID_REQUIRE: 'User id is required',
    UUID_WRONG: 'Invalid UUID',
    NAME_REQUIRE: 'The video name is required',
    NAME_LENGTH: 'The video name should have at least 1 character',
    URL_REQUIRE: 'The video url is required',
    URL_WRONG: 'Invalid url',
} as const;

export { VideoValidationMessage };
