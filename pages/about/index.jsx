import About from "../../components/About/About";
import {Fragment} from "react";
import Head from "next/head";

export default function AboutPage() {
    return (
        <Fragment>
            <Head>
                <title>All About Fluenty</title>
                <meta name='description' content='Learn about Fluenty'/>
            </Head>
            <About />
        </Fragment>
    );
}