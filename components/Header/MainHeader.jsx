import styles from './MainHeader.module.css';
import Link from "next/link";
import {useSession, signOut, signIn} from "next-auth/react"
import { CgMenuGridO } from "react-icons/cg";
import { CgCloseR } from "react-icons/cg";
import {useEffect, useRef, useState} from "react";

export default function MainHeader() {
    const [isOpen, setIsOpen] = useState(false)
    const {data: session, status, update} = useSession();
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                // Clicked outside the menu, close it
                setIsOpen(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Unbind the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    async function handleLogOut() {
        try {
            await signOut()
        } catch (error) {
            console.error("Failed to sign out", error);
            // Handle sign-in failure
        }

    }

    function handleMenu() {
        setIsOpen(!isOpen)
    }

    return (
        <header className={styles.header} onClick={handleMenu}>
            <div className={styles.logo}>
                <Link href='/'>Fluenty</Link>
            </div>
            <nav className={styles.navigation} ref={menuRef}>
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
                {!isOpen && (
                    <button className={styles.menu} onClick={handleMenu}>
                        <CgMenuGridO/>
                    </button>
                )}
                {isOpen && (
                    <button className={styles.menu} onClick={handleMenu}>
                        <CgCloseR />
                    </button>
                )}
                {isOpen && (
                    <ul className={styles.navigationContainerDropDown}>
                        <li className={styles.linkItem} onClick={handleMenu}>
                            <Link href='/#home'>Home</Link>
                        </li>
                        <li className={styles.linkItem} onClick={handleMenu}>
                            <Link href='/#services'>Services</Link>
                        </li>
                        <li className={styles.linkItem} onClick={handleMenu}>
                            <Link href='/#projects'>Projects</Link>
                        </li>
                        <li className={styles.linkItem} onClick={handleMenu}>
                            <Link href='/#team'>Team</Link>
                        </li>
                        <li className={styles.linkItem} onClick={handleMenu}>
                            <Link href='/blogs'>Blog</Link>
                        </li>
                        {session && status === 'authenticated' && (
                            <li onClick={handleMenu}>
                                <Link href='/' onClick={handleLogOut}>Logout</Link>
                            </li>
                        )}
                    </ul>
                )}
            </nav>
        </header>
    );
}