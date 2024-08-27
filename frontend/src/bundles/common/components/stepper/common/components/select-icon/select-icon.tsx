import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconMap, Size } from '~/bundles/common/icons/icons.js';

import { Icon, Text } from '../../../../components.js';

const selectIcon = (
    step:
        | 'completed'
        | 'current'
        | 'default'
        | 'lastIncompleted'
        | 'lastCompleted',
): JSX.Element => {
    if (step === 'completed') {
        return (
            <Text
                as="span"
                backgroundColor="background.900"
                display="inline-flex"
            >
                <Icon as={IconMap.CHECK_CIRCLE} boxSize={Size.XS} />
            </Text>
        );
    }

    if (step === 'current' || step === 'lastCompleted') {
        return (
            <Text
                as="span"
                sx={{
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '4px',
                    color: 'white',
                    border: '2px solid',
                    borderColor: 'background.600',
                    borderRadius: '50%',
                    backgroundColor: 'background.900',
                }}
            >
                <Icon
                    as={FontAwesomeIcon}
                    icon={IconMap.CIRCLE}
                    boxSize={Size.XS}
                />
            </Text>
        );
    }
    return (
        <Text as="span" color="background.600" display="inline-flex">
            <Icon
                as={FontAwesomeIcon}
                icon={IconMap.CIRCLE}
                boxSize={Size.XS}
            />
        </Text>
    );
};

export { selectIcon };
