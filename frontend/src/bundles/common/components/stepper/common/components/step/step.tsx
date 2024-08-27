import { Box, Flex, Text } from '../../../../components.js';
import { selectIcon } from '../components.js';

const Step = ({
    step,
    stepDescription,
}: {
    step:
        | 'completed'
        | 'current'
        | 'default'
        | 'lastIncompleted'
        | 'lastCompleted';
    stepDescription: string;
}): JSX.Element => {
    return (
        <Flex
            sx={{
                flex: 1,
                flexDirection: 'column',
                textAlign: 'center',
            }}
            _before={{
                content: '\'\'',
                position: 'relative',
                zIndex: 1,
                display: 'block',
                borderRadius: '50%',
                margin: '0.7rem auto 0',
            }}
            _after={
                step === 'lastIncompleted' || step === 'lastCompleted'
                    ? {}
                    : {
                            zIndex: -1,
                            content: '\'\'',
                            position: 'relative',
                            top: '1.5rem',
                            left: '50%',
                            height: '2px',
                            backgroundColor:
                                step === 'completed' ? 'white' : '#35399a',
                            order: -1,
                        }
            }
        >
            <Box>{selectIcon(step)}</Box>
            <Text
                as="p"
                sx={{
                    marginTop: '5px',
                    textAlign: 'center',
                    color:
                        step === 'default' || step === 'lastIncompleted'
                            ? '#35399a'
                            : 'white',
                }}
            >
                {stepDescription}
            </Text>
        </Flex>
    );
};

export { Step };
