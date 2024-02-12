import {Fragment} from "react";
import Head from "next/head";

export default function HomePage() {

    return (
        <Fragment>
            <Head>
                <title>Welcome to Fluenty</title>
                <meta name='description' content='Fluenty Development' />
            </Head>
            <h1>Fluenty Web Site</h1>
        </Fragment>
    );
}