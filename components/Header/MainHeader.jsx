import styles from './MainHeader.module.css';
import Link from "next/link.js";

export default function MainHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>Fluenty</Link>
            </div>
            <nav className={styles.navigation}>
                <ul className={styles.navigationContainer}>
                    <li className={styles.linkItem}>
                        <a href='#home'>Home</a>
                    </li>
                    <li className={styles.linkItem}>
                        <a href='#services'>Services</a>
                    </li>
                    <li className={styles.linkItem}>
                        <a href='#projects'>Projects</a>
                    </li>
                    <li className={styles.linkItem}>
                        <a href='#team'>Team</a>
                    </li>
                    <li className={styles.linkItem}>
                        <a href='/blog'>Blog</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}