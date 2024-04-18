import Link from "next/link";
import styles from './Footer.module.scss';
import {CiLinkedin} from "react-icons/ci";
import { MdCopyright } from "react-icons/md";
import packageJson from "../../package.json";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.logo}>
                <Link href="https://www.linkedin.com/">
                    <CiLinkedin />
                </Link>

                <nav className={styles.navigation}>
                    <ul className={styles.navigationContainer}>
                        <Link className={styles.linkItem} href='/privacyPolicy'>Privacy Policy</Link>
                        <Link className={styles.linkItem} href='/termsConditions'>Terms & Conditions</Link>
                        <Link className={styles.linkItem} href='/support'>Support</Link>
                    </ul>
                </nav>
            </div>
            <div className={styles.navigation}>
                <p><MdCopyright/> copyright 2024. All Rights Reserved</p>
                <p>Version: {packageJson.version}</p>
            </div>

        </footer>
    );
}