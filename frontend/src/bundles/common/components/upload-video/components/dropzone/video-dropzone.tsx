import { Input } from '@chakra-ui/react';
import { DndContext, useDroppable } from '@dnd-kit/core';
import { type ChangeEvent, type DragEvent } from 'react';

import { Box } from '~/bundles/common/components/components.js';
import { useCallback, useRef } from '~/bundles/common/hooks/hooks.js';
import { notificationService } from '~/bundles/common/services/services.js';

import { DropzoneInstructions } from './components/components.js';
import {
    DROPZONE_ID,
    MAX_FILE_SIZE,
    MIN_VIDEO_DURATION,
} from './libs/constants/constants.js';
import {
    DOM_EVENT,
    ERROR_ID,
    ERROR_MESSAGE,
    ERROR_TITLE,
    HTML_TAG,
} from './libs/enums/enums.js';
import { isFileSizeValid, isVideoFile } from './libs/helpers/helpers.js';

type Properties = {
    videoSource: string | null;
    handleRemoveVideo: () => void;
    handleSetVideo: (fileUlr: string) => void;
};

const VideoDropzone: React.FC<Properties> = ({
    videoSource,
    handleRemoveVideo,
    handleSetVideo,
}) => {
    const inputFile = useRef<HTMLInputElement | null>(null);
    const { setNodeRef } = useDroppable({
        id: DROPZONE_ID,
    });

    const handleFiles = useCallback(
        (files: FileList): void => {
            if (files && files.length > 0) {
                const file = files[0];

                if (!file) {
                    return;
                }

                if (!isFileSizeValid(file, MAX_FILE_SIZE)) {
                    notificationService.error({
                        message: ERROR_MESSAGE.VIDEO_SIZE,
                        id: ERROR_ID.VIDEO_SIZE,
                        title: ERROR_TITLE.VIDEO_SIZE,
                    });
                    return;
                }

                if (!isVideoFile(file)) {
                    notificationService.error({
                        message: ERROR_MESSAGE.FILE_TYPE,
                        id: ERROR_ID.FILE_TYPE,
                        title: ERROR_TITLE.FILE_TYPE,
                    });
                    return;
                }

                const videoURL = URL.createObjectURL(file);

                const videoElement = document.createElement(HTML_TAG.VIDEO);
                videoElement.src = videoURL;
                videoElement.addEventListener(DOM_EVENT.LOADED_METADATA, () => {
                    if (videoElement.duration > MIN_VIDEO_DURATION) {
                        handleSetVideo(videoURL);
                    } else {
                        notificationService.error({
                            message: ERROR_MESSAGE.VIDEO_DURATION,
                            id: ERROR_ID.VIDEO_DURATION,
                            title: ERROR_TITLE.VIDEO_DURATION,
                        });
                        handleRemoveVideo();
                    }
                });

                if (inputFile.current) {
                    inputFile.current.value = '';
                }
            }
        },
        [handleRemoveVideo, handleSetVideo],
    );

    const onDrop = useCallback(
        (event: DragEvent<HTMLDivElement>): void => {
            event.preventDefault();
            handleFiles(event.dataTransfer.files);
        },
        [handleFiles],
    );

    const onChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>): void => {
            handleFiles(event.target.files as FileList);
        },
        [handleFiles],
    );

    const onClick = useCallback(() => {
        if (!videoSource && inputFile.current) {
            inputFile.current.click();
        }
    }, [videoSource, inputFile]);

    const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }, []);

    return (
        <DndContext>
            <Box
                ref={setNodeRef}
                onDrop={onDrop}
                onDragOver={onDragOver}
                position="relative"
                height="320px"
                width="570px"
                border="3px dashed"
                borderColor={'gray.300'}
                borderRadius="12px"
                cursor="pointer"
                onClick={onClick}
                transition="0.4s"
                _hover={{
                    border: '3px dashed gray',
                }}
            >
                <Input
                    ref={inputFile}
                    id="file-input"
                    type="file"
                    accept="video/*"
                    style={{ display: 'none' }}
                    onChange={onChange}
                />
                <DropzoneInstructions />
            </Box>
        </DndContext>
    );
};

export { VideoDropzone };
