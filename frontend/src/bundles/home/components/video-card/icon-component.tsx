import { Flex, Icon } from '@chakra-ui/react';
import { type IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Properties = {
    icon: IconDefinition;
    buttonSize: string;
    iconSize: string;
    horizontalPosition: 'left' | 'right';
    horizontalPositionValue: string;
    top: string;
    transform?: string;
    backgroundColor?: string;
    borderRadius?: string;
};

const IconComponent: React.FC<Properties> = ({
    icon,
    buttonSize,
    iconSize,
    horizontalPosition,
    horizontalPositionValue,
    top,
    transform = '',
    backgroundColor = 'white',
    borderRadius = '0',
}) => {
    const isLeft = horizontalPosition === 'left';

    return (
        <Flex
            position="absolute"
            top={top}
            right={isLeft ? 'auto' : horizontalPositionValue}
            left={isLeft ? horizontalPositionValue : 'auto'}
            transform={transform}
            backgroundColor={backgroundColor}
            borderRadius={borderRadius}
            w={buttonSize}
            h={buttonSize}
            alignItems="center"
            justifyContent="center"
            opacity="0"
            transition="opacity 0.3s ease"
            _groupHover={{ opacity: 1 }}
        >
            <Icon
                as={FontAwesomeIcon}
                icon={icon}
                height={iconSize}
                width={iconSize}
                color="background.600"
            />
        </Flex>
    );
};

export { IconComponent };
