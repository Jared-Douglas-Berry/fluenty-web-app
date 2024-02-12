import {Fragment} from 'react';
import MainHeader from '../Header/MainHeader.jsx';

export default function Layout({children}) {
    return (
        <Fragment>
            <MainHeader/>
            <main>{children}</main>
        </Fragment>
    );
}
