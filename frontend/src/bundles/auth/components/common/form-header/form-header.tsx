import logo from '~/assets/img/logo-sm.svg';
import logoTxt from '~/assets/img/logo-text.svg';
import { Heading, Image,Text  } from '~/bundles/common/components/components.js';

import styles from './styles.module.css';

type Properties = {
    headerText: string;
    subheader: React.ReactNode;
};

const FormHeader: React.FC<Properties> = ({ headerText, subheader }) => {
    return (
        <>
            <h2 className={styles['logo']}>
                <Image src={logo} alt="Logo" />
                <Image src={logoTxt} alt="Logo text" />
            </h2>
            <Heading as="h1" className={styles['heading']}>
                {headerText}
            </Heading>
            <Text className={styles['text']}>{subheader}</Text>
        </>
    );
};

export { FormHeader };
