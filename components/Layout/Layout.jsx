import {Fragment} from 'react';
import MainHeader from '../Header/MainHeader.jsx';
import Footer from "../Footer/Footer.jsx";

export default function Layout({children}) {
    return (
        <Fragment>
            <MainHeader />
            <main>{children}</main>
            <Footer />
        </Fragment>
    );
}
