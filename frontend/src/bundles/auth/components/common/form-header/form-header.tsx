import { Heading, Text } from '~/bundles/common/components/components.js';

import styles from './form-header.module.css';

type Properties = {
    headerText: string;
    subheader: React.ReactNode;
};

const FormHeader: React.FC<Properties> = ({ headerText, subheader }) => {
    return (
        <>
            {/* TODO: Add logo */}
            <h2 className={styles['logo']}>LOGO</h2>
            <Heading as="h1" className={styles['heading']}>
                {headerText}
            </Heading>
            <Text className={styles['text']}>{subheader}</Text>
        </>
    );
};

export { FormHeader };
