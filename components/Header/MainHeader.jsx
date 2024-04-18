import styles from './MainHeader.module.scss';
import Link from "next/link";
import {useSession, signOut, signIn} from "next-auth/react"
import { CgMenuGridO } from "react-icons/cg";
import { CgCloseR } from "react-icons/cg";
import {useEffect, useRef, useState} from "react";
import NavLink from "./NavLink";

export default function MainHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const {data: session, status, update} = useSession();
    const menuRef = useRef(null);


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop = window.pageYOffset > 160 || document.documentElement.scrollTop;
            if (currentScrollTop > lastScrollTop) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
            setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    // useEffect(() => {
    //     const handleScroll = () => {
    //         const scrollTop = window.scrollY;
    //         setIsScrolled(scrollTop > 0); // Check if scrolled beyond the top
    //     };
    //
    //     window.addEventListener('scroll', handleScroll);
    //
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

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
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : styles.header1}`} onClick={handleMenu}>
            <div className={styles.logo}>
                <Link href='/'>Fluenty</Link>
            </div>
            <nav className={styles.navigation} ref={menuRef}>
                <ul className={styles.navigationContainer}>
                    <li className={styles.linkItem}>
                        <NavLink hrefActive="#home" href="/#home" >
                            Home
                        </NavLink>
                    </li>
                    <li className={styles.linkItem}>
                        <NavLink hrefActive="#services" href="/#services" >
                            Services
                        </NavLink>
                    </li>
                    <li className={styles.linkItem}>
                        <NavLink hrefActive="#projects" href="/#projects" >
                            Projects
                        </NavLink>
                    </li>
                    <li className={styles.linkItem}>
                        <NavLink hrefActive="#team" href="/#team" >
                            Team
                        </NavLink>
                    </li>
                    <li className={styles.linkItem}>
                        <NavLink hrefActive="#blogs" href="/blogs" >
                            Blog
                        </NavLink>
                    </li>
                    {session && status === 'authenticated' && (
                        <li className={styles.linkItem}>
                            <NavLink href="/" onClick={handleLogOut} >
                                Logout
                            </NavLink>
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