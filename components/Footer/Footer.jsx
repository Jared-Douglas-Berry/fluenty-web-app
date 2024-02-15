import Link from "next/link";
import styles from './Footer.module.css';
import {CiLinkedin} from "react-icons/ci";
import { MdCopyright } from "react-icons/md";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.logo}>
                <Link href="https://www.linkedin.com/">
                    <CiLinkedin size={30}/>
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

                <p><MdCopyright size={20}/> copyright 2024. All Rights Reserved</p>
            </div>

        </footer>
    );
}