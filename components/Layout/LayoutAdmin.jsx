import {Fragment} from 'react';
import styles from './LayoutAdmin.module.css';
import NavSideBar from "../Admin/NavSideBar";

export default function LayoutAdmin({children}) {
    return (
        <Fragment>
            <main className={styles.main}>
                <div className={styles.sideBar}>
                    <NavSideBar />
                </div>

                <div className={styles.child}>
                    {children}
                </div>
            </main>
        </Fragment>
    );
}
