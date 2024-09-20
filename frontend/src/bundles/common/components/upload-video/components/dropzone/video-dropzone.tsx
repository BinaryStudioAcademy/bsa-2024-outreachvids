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
    DOMEvent,
    ErrorId,
    ErrorMessage,
    ErrorTitle,
    HTMLTag,
} from './libs/enums/enums.js';
import { isFileSizeValid, isVideoFile } from './libs/helpers/helpers.js';

type Properties = {
    videoSource: string | null;
    onRemoveVideo: () => void;
    onSetVideo: (fileUlr: string) => void;
};

const VideoDropzone: React.FC<Properties> = ({
    videoSource,
    onRemoveVideo,
    onSetVideo,
}) => {
    const inputFile = useRef<HTMLInputElement | null>(null);
    const { setNodeRef } = useDroppable({
        id: DROPZONE_ID,
    });

    const handleUploadFile = useCallback(
        (files: FileList): void => {
            if (files && files.length > 0) {
                const file = files[0];

                if (!file) {
                    return;
                }

                if (!isFileSizeValid(file, MAX_FILE_SIZE)) {
                    notificationService.error({
                        message: ErrorMessage.VIDEO_SIZE,
                        id: ErrorId.VIDEO_SIZE,
                        title: ErrorTitle.VIDEO_SIZE,
                    });
                    return;
                }

                if (!isVideoFile(file)) {
                    notificationService.error({
                        message: ErrorMessage.FILE_TYPE,
                        id: ErrorId.FILE_TYPE,
                        title: ErrorTitle.FILE_TYPE,
                    });
                    return;
                }

                const videoURL = URL.createObjectURL(file);

                const videoElement = document.createElement(HTMLTag.VIDEO);
                videoElement.src = videoURL;
                videoElement.addEventListener(DOMEvent.LOADED_METADATA, () => {
                    if (videoElement.duration > MIN_VIDEO_DURATION) {
                        onSetVideo(videoURL);
                    } else {
                        notificationService.error({
                            message: ErrorMessage.VIDEO_DURATION,
                            id: ErrorId.VIDEO_DURATION,
                            title: ErrorTitle.VIDEO_DURATION,
                        });
                        onRemoveVideo();
                    }
                });

                if (inputFile.current) {
                    inputFile.current.value = '';
                }
            }
        },
        [onRemoveVideo, onSetVideo],
    );

    const handleDrop = useCallback(
        (event: DragEvent<HTMLDivElement>): void => {
            event.preventDefault();
            handleUploadFile(event.dataTransfer.files);
        },
        [handleUploadFile],
    );

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>): void => {
            handleUploadFile(event.target.files as FileList);
        },
        [handleUploadFile],
    );

    const handleClick = useCallback(() => {
        if (!videoSource && inputFile.current) {
            inputFile.current.click();
        }
    }, [videoSource, inputFile]);

    const handleClickDragOver = useCallback(
        (event: DragEvent<HTMLDivElement>) => {
            event.preventDefault();
        },
        [],
    );

    return (
        <DndContext>
            <Box
                ref={setNodeRef}
                onDrop={handleDrop}
                onDragOver={handleClickDragOver}
                position="relative"
                height="320px"
                width="570px"
                border="3px dashed"
                borderColor={'gray.300'}
                borderRadius="12px"
                cursor="pointer"
                onClick={handleClick}
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
                    onChange={handleChange}
                />
                <DropzoneInstructions />
            </Box>
        </DndContext>
    );
};

export { VideoDropzone };
