import styles from './styles.module.css';

const Loader = (): JSX.Element => {
    return (
        <div className={styles['loader-container']}>
            <div className={styles['loader']}>
                <div className={styles['logo-wrapper']}>
                    <div>LOGO</div>
                </div>
                <div className={styles['spinner-overlay']}></div>
            </div>
            <h2 className={styles['loader-text']}>Loading...</h2>
        </div>
    );
};

export { Loader };
