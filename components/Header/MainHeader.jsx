import styles from './MainHeader.module.css';
import Link from "next/link";

export default function MainHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>Fluenty</Link>
            </div>
            <nav className={styles.navigation}>
                <ul className={styles.navigationContainer}>
                    <li className={styles.linkItem}>
                        <Link href='/#home'>Home</Link>
                    </li>
                    <li className={styles.linkItem}>
                        <Link href='/#services'>Services</Link>
                    </li>
                    <li className={styles.linkItem}>
                        <Link href='/#projects'>Projects</Link>
                    </li>
                    <li className={styles.linkItem}>
                        <Link href='/#team'>Team</Link>
                    </li>
                    <li className={styles.linkItem}>
                        <Link href='/blog'>Blog</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}