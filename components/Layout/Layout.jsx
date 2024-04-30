import {Fragment} from 'react';
import MainHeader from '../Header/MainHeader.jsx';
import Footer from "../Footer/Footer.jsx";
import styles from './Layout.module.scss';
import Head from "next/head";

export default function Layout({children}) {
    return (
        <Fragment>
            <Head>
                <title>Fluenty</title>
                <meta name='description' content='Fluenty Development'/>
                <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
                <link rel="icon" type="image/ico" href="/fluenty.ico"/>
            </Head>


            <MainHeader />


            <main className={styles.main}>
                {children}
            </main>


            <Footer />

        </Fragment>
    );
}
