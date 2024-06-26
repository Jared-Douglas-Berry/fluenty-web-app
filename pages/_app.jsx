import './index.scss'
import Head from "next/head";
import Layout from "../components/Layout/Layout.jsx";
import {SessionProvider} from "next-auth/react";
import { AuthProvider } from '../authContext';

export default function MyApp({Component, pageProps}) {
    return (
        <AuthProvider>
            <SessionProvider session={pageProps.session}>
                <Layout>
                    <Head>
                        <title>Fluenty</title>
                        <meta name='description' content='Fluenty Development'/>
                        <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
                        <link rel="icon" type="image/ico" href="/fluenty.ico"/>
                    </Head>
                    <Component {...pageProps} />
                </Layout>
            </SessionProvider>

        </AuthProvider>
    )
}
