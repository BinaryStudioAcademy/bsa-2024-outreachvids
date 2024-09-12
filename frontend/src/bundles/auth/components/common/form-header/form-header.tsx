import {
    Heading,
    Logo,
    LogoText,
    Text,
} from '~/bundles/common/components/components.js';

import styles from './styles.module.css';

type Properties = {
    headerText: string;
    subheader: React.ReactNode;
};

const FormHeader: React.FC<Properties> = ({ headerText, subheader }) => {
    return (
        <>
            <h2 className={styles['logo']}>
                <Logo boxSize={'10%'} />
                <LogoText />
            </h2>
            <Heading as="h1" className={styles['heading']}>
                {headerText}
            </Heading>
            <Text className={styles['text']}>{subheader}</Text>
        </>
    );
};

export { FormHeader };
