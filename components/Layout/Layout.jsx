import {Fragment} from 'react';
import MainHeader from '../Header/MainHeader.jsx';
import Footer from "../Footer/Footer.jsx";
import styles from './Layout.module.css';

export default function Layout({children}) {
    return (
        <Fragment>
            <header>
                <MainHeader />
            </header>

            <main className={styles.main}>
                {children}
            </main>

            <footer>
                <Footer />
            </footer>
        </Fragment>
    );
}
