import {
    Heading,
    Logo,
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
                 <Logo textSize='200px' logoSize='60px' />

            <Heading as="h1" className={styles['heading']}>
                {headerText}
            </Heading>
            <Text className={styles['text']}>{subheader}</Text>
        </>
    );
};

export { FormHeader };
