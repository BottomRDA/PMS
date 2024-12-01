import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.navigate}>
                <ul className={styles.navigate__container}>
                    <Link 
                        className={styles.navigate__item} 
                        to={"/"}
                    >General</Link>
                    <Link 
                        className={styles.navigate__item}
                        to={"/Home"}
                    >Home</Link>
                    <Link
                        className={styles.navigate__item}
                        to={"/About"}
                    >About</Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header;