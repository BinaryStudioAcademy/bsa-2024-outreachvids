import { Loader } from '../components.js';
import styles from './styles.module.css';

const LoaderOverlay = (): JSX.Element => {
    return (
        <div className={styles['container']}>
            <Loader />
        </div>
    );
};

export { LoaderOverlay };
