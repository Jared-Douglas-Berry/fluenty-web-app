import Link from "next/link";
import styles from './NavSideBar.module.css';
import { GoProjectSymlink } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { FaBlog } from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";
import { GrServices } from "react-icons/gr";
import { GiTeamDowngrade, GiTechnoHeart  } from "react-icons/gi";
import { FaUserAstronaut } from "react-icons/fa6";
import {useSession} from "next-auth/react";

export default function NavSideBar() {
    const {data: session, status, update} = useSession();
    return (
        <div className={styles.container}>

            <h2>Admin Panel</h2>
            <ul>
                {session && status === 'authenticated' && (
                    <>
                        <li>
                            <Link href="/admin" className={styles.link}>
                                <RxDashboard className={styles.icon}/> Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/blog" className={styles.link}>
                                <FaBlog className={styles.icon}/> Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/email" className={styles.link}>
                                <HiOutlineMailOpen className={styles.icon}/> Email
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/projects" className={styles.link}>
                                <GoProjectSymlink className={styles.icon}/> Projects
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/services" className={styles.link}>
                                <GrServices className={styles.icon}/> Services
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/team" className={styles.link}>
                                <GiTeamDowngrade className={styles.icon}/> Team
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/tech" className={styles.link}>
                                <GiTechnoHeart className={styles.icon}/> Tech Stack
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/users" className={styles.link}>
                                <FaUserAstronaut className={styles.icon} /> Users
                            </Link>
                        </li>
                    </>
                )}
                {!session && status !== 'authenticated' && (
                    <li>
                        <Link href="/auth" className={styles.link}>Login</Link>
                    </li>
                )}

            </ul>
        </div>
    );
}