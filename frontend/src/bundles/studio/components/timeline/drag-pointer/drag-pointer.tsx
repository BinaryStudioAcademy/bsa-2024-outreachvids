import { type SystemStyleObject } from '@chakra-ui/react';

import { Box } from '~/bundles/common/components/components.js';

type Properties = {
    sx: SystemStyleObject;
};

const DragPointer: React.FC<Properties> = ({ sx }) => {
    return (
        <Box
            h="100%"
            w="1.5px"
            bgColor="background.900"
            position="absolute"
            left="100px"
            sx={sx}
        />
    );
};

export { DragPointer };
