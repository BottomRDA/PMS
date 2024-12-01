import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <p>© Русановская Дарья Александровна 2024 - {new Date().getFullYear()}</p>
        </footer>
    )
}

export default Footer;