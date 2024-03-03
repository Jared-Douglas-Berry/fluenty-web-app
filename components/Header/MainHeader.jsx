import styles from './MainHeader.module.css';
import Link from "next/link";
import {useSession, signOut, signIn} from "next-auth/react"

export default function MainHeader() {
    const {data: session, status, update} = useSession();

    async function handleLogOut() {
        try {
            await signOut()
        } catch (error) {
            console.error("Failed to sign out", error);
            // Handle sign-in failure
        }

    }

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
                        <Link href='/blogs'>Blog</Link>
                    </li>
                    {session && status === 'authenticated' && (
                        <li>
                            <Link href='/' onClick={handleLogOut}>Logout</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}