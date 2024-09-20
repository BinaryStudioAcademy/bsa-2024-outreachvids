const ErrorMessage = {
    VIDEO_SIZE: 'The video file size must not exceed 2 GB.',
    FILE_TYPE: 'The uploaded file must be a video.',
    VIDEO_DURATION: 'The video must be at least 2 minutes long.',
} as const;

export { ErrorMessage };
