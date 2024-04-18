import {Fragment} from 'react';
import styles from './LayoutAdmin.module.scss';
import NavSideBar from "../Admin/NavSideBar";
import Auth from "../Auth/Auth";
import Head from "next/head";
import {useAuth} from '../../authContext';

export default function LayoutAdmin({children}) {
    const {user} = useAuth();

    if (!user) {
        return (
            <Fragment>
                <Head>
                    <title>Fluenty Admin</title>
                    <meta name='description' content='Making the Fluenty Web site dynamic in the adin page'/>
                </Head>
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

    return <div>Protected Page</div>;
}
