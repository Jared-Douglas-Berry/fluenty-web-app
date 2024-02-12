import '../styles/globals.css'
import Head from "next/head";
import {Fragment} from "react";

export default function MyApp({Component, pageProps}) {
    return (
        <Fragment>
            <Head>
                <title>Fluenty</title>
                <meta name='description' content='Fluenty Development'/>
                <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
                <link rel="icon" type="image/ico" href="/fluenty.ico"/>
            </Head>
            <Component {...pageProps} />
        </Fragment>
    )
}
