import {Fragment} from 'react';
import styles from './LayoutAdmin.module.css';
import NavSideBar from "../Admin/NavSideBar";
import Auth from "../Auth/Auth";

export default function LayoutAdmin({children}) {
    return (
        <Fragment>
            <Auth>
                <main className={styles.main}>
                    <div className={styles.sideBar}>
                        <NavSideBar/>
                    </div>

                    <div className={styles.child}>
                        {children}
                    </div>
                </main>
            </Auth>
        </Fragment>
    );
}
