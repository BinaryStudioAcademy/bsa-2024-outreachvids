import {
    Heading,
    HStack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';

import { useCallback } from '~/bundles/common/hooks/hooks.js';
import { type GenerateVideoScriptRequestDto } from '~/bundles/video-scripts/video-scripts.js';

import styles from '../../../../video-modal.module.css';
import { GenerateScriptForm } from '../generate-script-form/generate-script-form.js';
import { GenerateScriptPlaceholder } from '../generate-script-placeholder/generate-script-placeholder.js';

const GenerateScriptView: React.FC = () => {
    const handleGenerateVideoScriptSubmit = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (payload: GenerateVideoScriptRequestDto): void => {
            // TODO dispatch video script generation action
        },
        [],
    );

    return (
        <>
            <Heading className={styles['scriptViewHeading']} variant="H3">
                Use Open AI to draft your video script
            </Heading>
            <Tabs variant="unstyled" size="sm">
                <TabList className={styles['scriptViewTabList']}>
                    <Tab
                        className={styles['scriptViewTab']}
                        _selected={{
                            color: 'brand.secondary.600',
                            bg: 'white',
                            boxShadow: 'md',
                        }}
                    >
                        Topic Input
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel className={styles['scriptViewTabPanel']}>
                        <HStack className={styles['scriptViewHStack']}>
                            <GenerateScriptForm
                                onSubmit={handleGenerateVideoScriptSubmit}
                            />
                            <GenerateScriptPlaceholder />
                        </HStack>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
};

export { GenerateScriptView };
