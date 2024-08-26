import { Circle } from '../../components.js';

const Dots = (): JSX.Element => {
    return (
        <>
            <Circle
                size="3px"
                bg="background.600"
                position="absolute"
                top="-85%"
                left="-200%"
            />
            <Circle
                size="3px"
                bg="background.600"
                position="absolute"
                bottom="-95%"
                left="-110%"
            />
            <Circle
                size="3px"
                bg="background.600"
                position="absolute"
                top="-135%"
                left="-40%"
            />
            <Circle
                size="3px"
                bg="background.600"
                position="absolute"
                bottom="-60%"
                left="-18%"
            />
            <Circle
                size="3px"
                bg="background.600"
                position="absolute"
                bottom="-28%"
                left="30%"
            />
            <Circle
                size="3px"
                bg="background.600"
                position="absolute"
                left="60%"
                bottom="-130%"
            />
            <Circle
                size="3px"
                bg="background.600"
                position="absolute"
                left="80%"
                top="-150%"
            />
            <Circle
                size="3px"
                bg="background.600"
                position="absolute"
                right="-40%"
                top="40%"
            />
            <Circle
                size="3px"
                bg="background.600"
                position="absolute"
                right="-130%"
                top="-100%"
            />
            <Circle
                size="3px"
                bg="background.600"
                position="absolute"
                right="-135%"
                bottom="-95%"
            />
            <Circle
                size="3px"
                bg="background.600"
                position="absolute"
                right="-220%"
                bottom="95%"
            />
        </>
    );
};

export { Dots };
