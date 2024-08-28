import { Circle } from '~/bundles/common/components/components.js';

const Circles = (): JSX.Element => {
    return (
        <Circle
            size="271px"
            border="solid 1px"
            borderColor="background.50"
            position="absolute"
            left="-71%"
            top="-270%"
        >
            <Circle size="159px" border="solid 1px" borderColor="background.50">
                <Circle
                    size="113px"
                    border="solid 1px"
                    borderColor="background.50"
                />
            </Circle>
        </Circle>
    );
};

export { Circles };
