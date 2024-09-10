import { Box, Flex, Icon, ListItem,Text, UnorderedList } from '~/bundles/common/components/components.js';
import { IconName } from '~/bundles/common/icons/icons.js';

import styles from './styles.module.css';

interface InstructionListProperties {
    color: string;
    listItems: string[];
    title: string;

}

const InstructionList: React.FC<InstructionListProperties> = ({ color, listItems, title }) => (
    <Box>
        <Flex gap="5px" marginBottom="30px">
            <Icon
                className={styles['iconAvoid']}
                boxSize={5}
                as={IconName.CHECK_CIRCLE}
                color={color}
            />
            <Text
                as="span"
                color={color}
                variant="bodySmall"
            >
                {title}
            </Text>
        </Flex>
        <UnorderedList maxWidth="300px">
            {listItems.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
            ))}
        </UnorderedList>
    </Box>
);

export { InstructionList };