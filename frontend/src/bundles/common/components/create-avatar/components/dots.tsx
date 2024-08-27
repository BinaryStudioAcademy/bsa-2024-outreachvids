import { Circle } from '../../components.js';

const Dots = (): JSX.Element => {
    const SIZE = '3px';
    const COLOR = 'background.600';

    return (
        <>
            <Circle
                size={SIZE}
                bg={COLOR}
                position="absolute"
                top="-85%"
                left="-200%"
            />
            <Circle
                size={SIZE}
                bg={COLOR}
                position="absolute"
                bottom="-95%"
                left="-110%"
            />
            <Circle
                size={SIZE}
                bg={COLOR}
                position="absolute"
                top="-135%"
                left="-40%"
            />
            <Circle
                size={SIZE}
                bg={COLOR}
                position="absolute"
                bottom="-60%"
                left="-18%"
            />
            <Circle
                size={SIZE}
                bg={COLOR}
                position="absolute"
                bottom="-28%"
                left="30%"
            />
            <Circle
                size={SIZE}
                bg={COLOR}
                position="absolute"
                left="60%"
                bottom="-130%"
            />
            <Circle
                size={SIZE}
                bg={COLOR}
                position="absolute"
                left="80%"
                top="-150%"
            />
            <Circle
                size={SIZE}
                bg={COLOR}
                position="absolute"
                right="-40%"
                top="40%"
            />
            <Circle
                size={SIZE}
                bg={COLOR}
                position="absolute"
                right="-130%"
                top="-100%"
            />
            <Circle
                size={SIZE}
                bg={COLOR}
                position="absolute"
                right="-135%"
                bottom="-95%"
            />
            <Circle
                size={SIZE}
                bg={COLOR}
                position="absolute"
                right="-220%"
                bottom="95%"
            />
        </>
    );
};

export { Dots };